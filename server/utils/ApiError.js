class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;

    // Error.stackTraceLimit(this, this.constructor);
  }
}
module.exports = ApiError;
