type ErrorType = "auth" | "input";

export class BaseError extends Error {
  type: ErrorType;

  constructor(type: ErrorType, message: string) {
    super(message);
    this.type = type;
  }
}
