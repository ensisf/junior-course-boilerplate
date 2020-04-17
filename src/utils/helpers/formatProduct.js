import { PRODUCT_STATUSES } from "constants";
import { formatPrice } from "helpers";

export const formatProduct = ({
  price,
  img,
  status,
  name,
  stars,
  ...rest
}) => ({
  price: formatPrice(price),
  isInStock: status === PRODUCT_STATUSES.IN_STOCK,
  title: name,
  maxRating: 5,
  rating: stars,
  subPriceContent: "",
  img: "https://via.placeholder.com/224x200",
  ...rest,
});
