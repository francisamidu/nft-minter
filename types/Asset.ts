type Asset = {
  id: string | number;
  image: string;
  description: string;
  title: string;
  price: string;
  sold: boolean;
  seller?: string;
  owner?: string;
};
export default Asset;
