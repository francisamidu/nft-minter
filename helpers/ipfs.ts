import { create } from "ipfs-http-client";

const client = create({
  url: "https://ipfs.io/",
});

export default client;
