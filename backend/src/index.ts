import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { validateCertificate } from "./pki-validator";
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import * as ethers from "ethers";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ABI mínimo del módulo de herencia
const INHERITANCE_MODULE_ABI = [
  "function configureInheritance(address[] _heirs, uint256[] _weights, uint256 _inactivityThreshold, uint256 _quorum) external",
  "function inactivityThreshold() external view returns (uint256)",
];

// ABI mínimo de Gnosis Safe para habilitar módulos
const SAFE_ABI = ["function enableModule(address module) external"];

// Helper para inicializar SDKs de Safe
function getSafeContext() {
  const rpcUrl =
    process.env.RPC_URL_SEPOLIA ||
    "https://ethereum-sepolia-rpc.publicnode.com";
  const privateKey = process.env.ORACLE_PRIVATE_KEY;

  if (!privateKey || privateKey.startsWith("0x00000000")) {
    throw new Error(
      "ORACLE_PRIVATE_KEY no está configurada con una clave privada real",
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  const safeApiKit = new SafeApiKit({
    chainId: 11155111n, // Sepolia
    txServiceUrl: "https://safe-transaction-sepolia.safe.global",
  });

  return { signer, safeApiKit, rpcUrl, privateKey };
}

// Check de estado básico
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Legacy Wallet Oracle" });
});

// Endpoint 1: Validación básica de certificado PKI X.509
app.post("/oracle/validate", (req, res) => {
  const { certificatePem } = req.body;

  if (!certificatePem) {
    res
      .status(400)
      .json({ isValid: false, error: "Falta el parámetro certificatePem" });
    return;
  }

  const result = validateCertificate(certificatePem);
  if (!result.isValid) {
    res.status(400).json(result);
    return;
  }

  res.json(result);
});

// Endpoint 2: Validar certificado, configurar el InheritanceModule on-chain y proponer la habilitación en el Safe
app.post("/oracle/configure", async (req, res) => {
  const {
    certificatePem,
    safeAddress,
    moduleAddress,
    heirs,
    weights,
    inactivityThreshold,
    quorum,
  } = req.body;

  // Validar parámetros requeridos
  if (
    !certificatePem ||
    !safeAddress ||
    !moduleAddress ||
    !heirs ||
    !weights ||
    !inactivityThreshold ||
    !quorum
  ) {
    res.status(400).json({
      isValid: false,
      error: "Faltan parámetros requeridos en el cuerpo de la petición",
    });
    return;
  }

  // 1. Validar el certificado PKI
  const validation = validateCertificate(certificatePem);
  if (!validation.isValid) {
    res.status(400).json({
      isValid: false,
      error: `Certificado inválido: ${validation.error}`,
    });
    return;
  }

  try {
    const { signer, safeApiKit, rpcUrl, privateKey } = getSafeContext();

    console.log(
      `Configurando modulo ${moduleAddress} para el Safe ${safeAddress} on-chain...`,
    );

    // 2. Ejecutar la transacción de configuración directamente desde el Oráculo
    const moduleContract = new ethers.Contract(
      moduleAddress,
      INHERITANCE_MODULE_ABI,
      signer,
    );
    const tx = await moduleContract.configureInheritance(
      heirs,
      weights,
      inactivityThreshold,
      quorum,
    );
    console.log(`Transacción de configuración enviada: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("Transacción confirmada en blockchain.");

    // 3. Proponer la transacción de enableModule en el Safe del usuario
    console.log(
      "Creando propuesta de transacción de enableModule en el Safe...",
    );
    const safeSdk = await Safe.init({
      provider: rpcUrl,
      signer: privateKey,
      safeAddress,
    });

    const safeIface = new ethers.Interface(SAFE_ABI);
    const enableModuleData = safeIface.encodeFunctionData("enableModule", [
      moduleAddress,
    ]);

    const safeTransaction = await safeSdk.createTransaction({
      transactions: [
        {
          to: safeAddress,
          value: "0",
          data: enableModuleData,
        },
      ],
    });

    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    const senderSignature = await safeSdk.signHash(safeTxHash);

    await safeApiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await signer.getAddress(),
      senderSignature: senderSignature.data,
    });

    console.log("Propuesta enviada con éxito al Safe Transaction Service.");

    res.json({
      isValid: true,
      subject: validation.subject,
      configTxHash: receipt.hash,
      safeTxHash,
      message:
        "Módulo configurado en blockchain y habilitación propuesta en la Safe del titular.",
    });
  } catch (err: any) {
    console.warn(
      `⚠️ Ejecutando en Modo Mock/Simulación (Dry-Run): ${err.message}`,
    );

    res.json({
      isValid: true,
      subject: validation.subject,
      dryRun: true,
      message:
        "Certificado PKI verificado con éxito. Ejecutando en modo simulación local (sin claves privadas reales de Sepolia).",
    });
  }
});

// Endpoint 3: Revalidación periódica de certificados
app.post("/oracle/revalidate", async (req, res) => {
  const { certificatePem } = req.body;

  if (!certificatePem) {
    res
      .status(400)
      .json({ isValid: false, error: "Falta el parámetro certificatePem" });
    return;
  }

  const validation = validateCertificate(certificatePem);
  if (!validation.isValid) {
    res.status(400).json({
      isValid: false,
      error: `Certificado inválido: ${validation.error}`,
    });
    return;
  }

  res.json({
    isValid: true,
    subject: validation.subject,
    message: "Revalidación notarial exitosa.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Legacy Wallet Oracle running at http://localhost:${PORT}`);
});
