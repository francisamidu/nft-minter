module.exports = {
  images: {
    domains: ["ipfs.fleek.co","gateway.ipfs.io","ipfs.infura.io","localhost"],
  },
  publicRuntimeConfig:{
    INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
  }
};
