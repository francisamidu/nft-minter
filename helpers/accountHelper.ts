import { ethers } from "ethers";

class AccountHelper {
    // Helper method for fetching a connection provider to the Ethereum network
  static getProvider() {
    const provider = new ethers.providers.InfuraProvider(
      "ropsten",
      process.env.NEXT_PUBLIC_INFURA_ID
    );
    return provider;
  }

  // Helper method for fetching a wallet account using an environment variable for the PK
  static getAccount() {
    return new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY,
      AccountHelper.getProvider()
    );
  }
}

export default AccountHelper;
