import SafeApiKit from "@safe-global/api-kit";

async function run() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const apiKit = new SafeApiKit({
    chainId: 11155111n,
    txServiceUrl: "https://safe-transaction-sepolia.safe.global",
  });

  try {
    console.log("Calling getSafeInfo using SDK...");
    const info = await apiKit.getSafeInfo(safeAddress);
    console.log("Success! Safe Info:", JSON.stringify(info, null, 2));
  } catch (err: any) {
    console.error("SDK Error:", err);
  }
}

run();
