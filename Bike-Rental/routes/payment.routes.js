const Router = require("@koa/router")
const { addPayment, getPayment, getPayments, updatePayment, deletePayment } = require("../controller/payment.controller")
const validator = require("../middleware/validator");


const router = new Router()
router.post("/",validator("payment") ,addPayment)
router.get("/", getPayments)
router.get("/:id", getPayment)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports = () => router.routes()