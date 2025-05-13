class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Custom error types
class ValidationError extends ErrorResponse {
  constructor(message) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

class ConflictError extends ErrorResponse {
  constructor(message) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

// Error response helper function
const createErrorResponse = (message, statusCode) => {
  return new ErrorResponse(message, statusCode);
};

module.exports = {
  ErrorResponse,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  createErrorResponse,
};
