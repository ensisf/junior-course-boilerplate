import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useQuery = () => {
  const { search = {} } = useLocation();

  return queryString.parse(search);
};
export { useQuery };
