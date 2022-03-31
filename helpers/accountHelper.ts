import { ethers } from "ethers";

class AccountHelper {
  // Helper method for fetching environment variables from .env
  static getEnvVariable(key, defaultValue) {
    if (process.env[key]) {
      return process.env[key];
    }
    if (!defaultValue) {
      throw `${key} is not defined and no default value was provided`;
    }
    return defaultValue;
  }

  // Helper method for fetching a connection provider to the Ethereum network
  static getProvider() {
    const provider = new ethers.providers.InfuraProvider(
      "ropsten",
      AccountHelper.getEnvVariable("NEXT_PUBLIC_INFURA_ID", "rosten")
    );
    return provider;
  }

  // Helper method for fetching a wallet account using an environment variable for the PK
  static getAccount() {
    return new ethers.Wallet(
      AccountHelper.getEnvVariable("NEXT_PUBLIC_PRIVATE_KEY", ""),
      AccountHelper.getProvider()
    );
  }
}

export default AccountHelper;
