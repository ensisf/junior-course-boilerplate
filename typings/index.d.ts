type ButtonSize = "lg";

type ButtonType = "button" | "reset" | "submit";

type FormField = "input" | "textarea";

type InputType = "text" | "number" | "tel" | "email" | "search";

type Product = {
  id: number | string;
  isInStock: boolean;
  img: string;
  title: string;
  price: number;
  subPriceContent: string;
  maxRating: number;
  rating: number;
  discount: number;
};

type OnFilterChange = (payload: { name: string; value: number }) => void;
