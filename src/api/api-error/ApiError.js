class ApiError extends Error {
  extra; // some extra data, needed, for example, for Sentry logging

  constructor(options) {
    const { extra, message } = options;
    super(message);
    this.extra = extra;
  }
}

export { ApiError };
