import { HTTP_METHODS } from "constants";

class ApiClient {
  #config = {};

  constructor(config) {
    if (!config) throw Error("ApiClient: config is required");

    this.#config = config;
  }

  async get({ url, options = {} }) {
    try {
      const response = await fetch(`${this.#config.BASE_URL}/${url}`, {
        method: HTTP_METHODS.GET,
        ...options,
      });
      return response.json();
    } catch (error) {
      console.error("Error during fething data:", error);
      throw error;
    }
  }
}

export { ApiClient };
