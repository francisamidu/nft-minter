module.exports = {
  images: {
    domains: ["ipfs.infura.io","localhost"],
  },
  publicRuntimeConfig:{
    INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
  }
};
