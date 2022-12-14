const jwt = require("./JwtService");
const config = require("config");
const ApiError = require("../errors/ApiError");

module.exports = function (ctx, next) {
  if (ctx.method === "OPTIONS") return next();
  try {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      return ctx.error(403, { friendlyMsg: "User not registered" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return ctx.error(403, { friendlyMsg: "User not registered" });
    }
    const decodeData = jwt.verifyAccess(token);
    ctx.user = decodeData; 
    return next();
  } catch (error) {
    return ctx.error(403, { friendlyMsg: "Admin not registered" });
  }
};
