import Safe from "@safe-global/protocol-kit";
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

  const body = {
    to: safeTransaction.data.to,
    value: safeTransaction.data.value,
    data: safeTransaction.data.data,
    operation: safeTransaction.data.operation,
    safeTxGas: safeTransaction.data.safeTxGas,
    baseGas: safeTransaction.data.baseGas,
    gasPrice: safeTransaction.data.gasPrice,
    gasToken: safeTransaction.data.gasToken,
    refundReceiver: safeTransaction.data.refundReceiver,
    nonce: safeTransaction.data.nonce,
    contractTransactionHash: safeTxHash,
    sender: signer.address,
    signature: senderSignature.data,
    origin: "Legacy Wallet"
  };

  const url = `https://safe-transaction-sepolia.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/`;

  console.log("Posting to:", url);
  console.log("Body:", JSON.stringify(body, null, 2));

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Status:", res.status);
    console.log("StatusText:", res.statusText);
    const text = await res.text();
    console.log("Response Text:", text);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

run();
