import { HTTP_METHODS } from "constants";
import { ApiError, apiErrorLogger } from "api/api-error";
class ApiClient {
  #config = {};

  constructor(config) {
    if (!config) throw Error("ApiClient: config is required");

    this.#config = config;
  }

  async get({ url, options = {} }) {
    const URL = `${this.#config.BASE_URL}/${url}`;
    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        ...options,
      });
      return response.json();
    } catch (err) {
      const error = new ApiError({
        extra: {
          reuestError: err,
          url: URL,
        },
        message: "Error during fething data",
      });
      apiErrorLogger(error);
      throw error;
    }
  }
}

export { ApiClient };
