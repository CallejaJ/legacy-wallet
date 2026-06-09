async function run() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const url1 = `https://safe-transaction-sepolia.safe.global/api/v2/safes/${safeAddress}/multisig-transactions/?executed=false&nonce__gte=0`;

  try {
    console.log("Fetching V2 URL:", url1);
    const res1 = await fetch(url1);
    console.log("V2 Status:", res1.status);
    const text1 = await res1.text();
    console.log("V2 Response Text:", text1);
  } catch (e) {
    console.error("V2 error", e);
  }
}

run();
