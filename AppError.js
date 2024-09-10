class AppError extends Error {
  constructor(errorCode, message, statusCode, details = null) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.details = details;
  }
}
export default AppError;
