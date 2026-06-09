const { ethers } = require("ethers");

async function check() {
  const safeAddress = "0x86D2cE648D08DDc481a878092ab51e7dc340b7E5";
  const rpcUrl = "https://ethereum-sepolia-rpc.publicnode.com";
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  try {
    const code = await provider.getCode(safeAddress);
    console.log("On-chain code length:", code.length);
    if (code === "0x") {
      console.log("Safe is NOT deployed on-chain!");
    } else {
      console.log("Safe IS deployed on-chain.");
    }
  } catch (err) {
    console.error("RPC Error:", err);
  }
}

check();
