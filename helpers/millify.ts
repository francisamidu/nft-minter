const millify = (number: number) => {
  if (number >= 1_000 && number < 10_000) {
    return `${number.toString().slice(0, 1)}K`;
  }

  if (number >= 10_000 && number < 100_000) {
    return `${number.toString().slice(0, 2)}K`;
  }

  if (number >= 100_000 && number < 1_000_000) {
    return `${number.toString().slice(0, 3)}K`;
  }

  if (number >= 1_000_000 && number < 10_000_000) {
    return `${number.toString().slice(0, 1)}M`;
  }

  if (number >= 10_000_000 && number < 100_000_000) {
    return `${number.toString().slice(0, 2)}M`;
  }

  if (number >= 100_000_000 && number < 1_000_000_000) {
    return `${number.toString().slice(0, 3)}M`;
  }

  if (number >= 1_000_000_000 && number < 10_000_000_000) {
    return `${number.toString().slice(0, 1)}B`;
  }

  if (number >= 10_000_000_000 && number < 100_000_000_000) {
    return `${number.toString().slice(0, 2)}B`;
  }
};
export default millify;
