const Router = require("@koa/router")
const { addShopInfo, getShopInfo, getShopInfos, updateShopInfo, deleteShopInfo } = require("../controller/shopinfo.controller")
const validator = require("../middleware/validator");


const router = new Router()
router.post("/", validator("shopInfo"), addShopInfo)
router.get("/", getShopInfos)
router.get("/:id", getShopInfo)
router.put("/:id", updateShopInfo)
router.delete("/:id", deleteShopInfo)

module.exports = () => router.routes()