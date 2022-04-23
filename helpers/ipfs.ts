import {create} from 'ipfs-core'

const client = create({
  apiPath: "/api/v0",
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default client;
