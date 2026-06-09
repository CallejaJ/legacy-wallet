async function run() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const urls = [
    `https://safe-transaction-sepolia.safe.global/api/v1/safes/${safeAddress}/`,
    `https://safe-transaction-sepolia.safe.global/v1/safes/${safeAddress}/`,
    `https://api.safe.global/tx-service/sep/v1/safes/${safeAddress}/`,
    `https://api.safe.global/tx-service/sep/api/v1/safes/${safeAddress}/`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`Status ${res.status} for: ${url}`);
    } catch (e) {
      console.error(`Error for ${url}:`, e);
    }
  }
}

run();
