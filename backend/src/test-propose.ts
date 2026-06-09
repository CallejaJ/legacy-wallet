import Safe from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { ethers } from "ethers";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const SAFE_ABI = [
  "function enableModule(address module) external"
];

async function run() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const moduleAddress = "0xe634Ac0e4c3458b0339d1FE7E7abe4DFF80fB472";
  const rpcUrl = "https://ethereum-sepolia-rpc.publicnode.com";
  const privateKey = process.env.ORACLE_PRIVATE_KEY!;

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const safeApiKit = new SafeApiKit({
    chainId: 11155111n,
    txServiceUrl: "https://api.safe.global/tx-service/sep",
  });

  console.log("Oracle address:", signer.address);

  try {
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

    console.log("Proposing transaction...");
    await safeApiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await signer.getAddress(),
      senderSignature: senderSignature.data,
    });

    console.log("Success!");
  } catch (err: any) {
    console.error("Full error:", err);
    if (err.response) {
      try {
        console.error("Response body:", await err.response.text());
      } catch (e) {
        console.error("Could not read response body", e);
      }
    }
  }
}

run();
