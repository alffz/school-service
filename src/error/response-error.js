class ResponseError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.messages = message;
  }
}

export default ResponseError;
