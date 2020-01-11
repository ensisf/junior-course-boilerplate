export const formatPrice = (price: number): string =>
  `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
