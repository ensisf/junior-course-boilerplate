import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "hooks";

const useRoute = () => {
  const location = useLocation();

  const query = useQuery();

  return (params = {}) => ({
    ...location,
    search: queryString.stringify({
      ...query,
      ...params,
    }),
  });
};
export { useRoute };
