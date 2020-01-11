export const getMaxMinPrice = (
  arr: Product[]
): { min: number; max: number } => {
  const prices = arr.map(({ price }) => price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return {
    min,
    max
  };
};
