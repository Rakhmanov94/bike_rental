const Router = require("@koa/router");
const shopinfoRouter = require("./shopinfo.routes");
const bikecategoryRouter = require("./bikecategory.routes");
const penaltyRouter = require("./penalty.routes");
const paymentRouter = require("./payment.routes");
const adsManagmentRouter = require("./adsmanagment.routes");
const bikeInfoRouter = require("./bikeinfo.routes");
const clientRouter = require("./client.routes");
const rentalRouter = require("./rental.routes");
const userRouter = require("./user.routes");
const usergroupRouter = require("./usergroup.routes");
const response = require("./responses.routes");

const router = new Router();

router.use(response())

router.use("/api/shopinfo", shopinfoRouter());
router.use("/api/bike_category", bikecategoryRouter());
router.use("/api/penalty", penaltyRouter());
router.use("/api/payment", paymentRouter());
router.use("/api/ads_managment", adsManagmentRouter());
router.use("/api/bike_info", bikeInfoRouter());
router.use("/api/client", clientRouter());
router.use("/api/rental", rentalRouter());
router.use("/api/user", userRouter());
router.use("/api/usergroup", usergroupRouter());

module.exports = router.routes();
