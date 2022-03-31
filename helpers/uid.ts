const uid = () => {
  const head = Math.random().toString(36).substring(2);
  const body = Math.random().toString(36).substring(3);
  const tail = Math.random().toString(36).substring(4);
  return `${head}-${body}-${tail}`;
};
export default uid;
