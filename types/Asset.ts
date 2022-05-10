type Asset = {
  createdAt?: Date | string;
  id: string | number;
  image: string;
  description: string;
  name: string;
  owner?: string;
};
export default Asset;
