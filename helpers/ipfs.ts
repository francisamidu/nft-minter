import { create } from "ipfs-http-client";

const client = create({
  host: "localhost",
  port: 5001,
  protocol: "http",
});

export default client;
