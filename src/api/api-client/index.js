import { HTTP_METHODS } from "constants";
import { ApiError, apiErrorLogger } from "api/api-error";
class ApiClient {
  #config = {};

  constructor(config) {
    if (!config) throw Error("ApiClient: config is required");

    this.#config = config;
  }

  #handleError = (error, url, message = "Error during API call") => {
    const err = new ApiError({
      extra: {
        reuestError: error,
        url,
      },
      message: message,
    });
    apiErrorLogger(err);
    throw err;
  };

  #getUrl = (url) => {
    return `${this.#config.BASE_URL}${url}`;
  };

  async get({ url, options = {} }) {
    const URL = this.#getUrl(url);
    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        ...options,
      });
      return response.json();
    } catch (err) {
      this.#handleError(err, URL, "Error during fething data");
    }
  }

  async post({ url, options = {} }) {
    const URL = this.#getUrl(url);
    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.POST,
        ...options,
      });
      return response.json();
    } catch (err) {
      this.#handleError(err, URL, "Error during posting data");
    }
  }
}

export { ApiClient };
