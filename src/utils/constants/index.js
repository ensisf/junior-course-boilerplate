import { objToMap } from "helpers";

export const HEADINGS_MAP = objToMap({
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  default: "h1"
});

export const FIELD_TYPES = {
  input: "input",
  textarea: "textarea"
};

export const INPUT_TYPES = {
  text: "text",
  number: "number",
  tel: "tel",
  email: "email",
  search: "search"
};

export const BUTTON_SIZES = {
  lg: "lg"
};

export const BUTTON_TYPES = {
  button: "button",
  reset: "reset",
  submit: "submit"
};

export const BUTTON_VARIANTS = {
  light: "light"
};

export const CATEGORIES = [
  { value: false, name: "clothes", label: "Clothes" },
  { value: false, name: "books", label: "Books" }
];

export const ITEMS_PER_PAGE = 6;

export const START_PAGE_NUMBER = 1;
