class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(ctx, errorMessage) {
    return ctx.error(400, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static unauthorized(ctx, errorMessage) {
    return ctx.error(401, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static forbitten(ctx, errorMessage) {
    return ctx.error(403, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static notFound(ctx, errorMessage) {
    return ctx.error(404, {
      message: errorMessage.message,
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
  static internal(ctx, errorMessage) {
    console.log(errorMessage.message);
    return ctx.error(500, {
      friendlyMsg: errorMessage.friendlyMsg,
    });
  }
}
module.exports = ApiError;
