import { HTTP_METHODS } from "constants";

class ApiClient {
  #config = {};

  constructor(config) {
    if (!config) throw Error("ApiClient: config is required");

    this.#config = config;
  }

  async get({ url, options = {} }) {
    const response = await fetch(`${this.#config.BASE_URL}${url}`, {
      method: HTTP_METHODS.GET,
      ...options,
    });

    return response.json();
  }

  async post({ url, options = {} }) {
    const response = await fetch(`${this.#config.BASE_URL}${url}`, {
      method: HTTP_METHODS.POST,
      ...options,
    });

    return response.json();
  }
}

export { ApiClient };
