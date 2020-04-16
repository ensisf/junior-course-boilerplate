import { HTTP_METHODS } from "constants";
import { ApiError, apiErrorLogger } from "api/api-error";
class ApiClient {
  #config = {};

  constructor(config) {
    if (!config) throw Error("ApiClient: config is required");

    this.#config = config;
  }

  _handleError(error, url, message = "Error during API call") {
    const err = new ApiError({
      extra: {
        reuestError: error,
        url,
      },
      message: message,
    });
    apiErrorLogger(err);
    throw err;
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
      this._handleError(err, URL, "Error during fething data");
    }
  }

  async post({ url, options = {} }) {
    try {
      const response = await fetch(`${this.#config.BASE_URL}${url}`, {
        method: HTTP_METHODS.POST,
        ...options,
      });
      return response.json();
    } catch (err) {
      this._handleError(err, URL, "Error during posting data");
    }
  }
}

export { ApiClient };
