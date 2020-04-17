import { ApiClient } from "api/api-client";
import { BASE_URL } from "constants";

const config = {
  BASE_URL: process.env.BASE_URL || BASE_URL,
};

const apiClient = new ApiClient(config);

export { apiClient };
