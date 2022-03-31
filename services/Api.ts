class Api {
  static async getCryptoExchangeRate() {
    try {
      const request = await fetch(
        "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
      );
      const response = await request.json();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const { getCryptoExchangeRate } = Api;
