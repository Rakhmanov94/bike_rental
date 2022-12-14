// const ApiError = require("../errors/ApiError");

// module.exports = function (err, ctx, next) {
//   console.log(err.message);
//   if (err instanceof ApiError) {
//     return ctx.status;
//   }
//   if (err.message.includes("Unexpected token")) {
//     ctx.status = err.status 
//     ctx.body = { message: err.message };
//     return 
//   }
//   ctx.status = 500
//   ctx.body = { message: "Nazarda tutilmagan xatolik!" };
// };

// const ApiError = require("../errors/ApiError");

// module.exports = function (err, ctx, next) {
//   console.log(err.message);
//   if (err instanceof ApiError) {
//     return ctx.status(err.status).json({ message: err.message });
//   }
//   if (err.message.includes("Unexpected token")) {
//     return ctx.status(err.status).json({ message: err.message });
//   }
//   return ctx.status(500).send({ message: "Nazarda tutilmagan xatolik!" });
// };