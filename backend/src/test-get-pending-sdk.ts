import SafeApiKit from "@safe-global/api-kit";

async function run() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const apiKit = new SafeApiKit({
    chainId: 11155111n,
    txServiceUrl: "https://safe-transaction-sepolia.safe.global",
  });

  try {
    console.log("Calling getPendingTransactions using SDK...");
    const pending = await apiKit.getPendingTransactions(safeAddress);
    console.log("Success! Count of pending txs:", pending.count);
  } catch (err: any) {
    console.error("SDK Error:", err);
  }
}

run();
