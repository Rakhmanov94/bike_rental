const Router = require("@koa/router")
const { addBikeInfo, getBikeInfos, getBikeInfo, updateBikeInfo, deleteBikeInfo } = require("../controller/bikeinfo.controller")
const validator = require("../middleware/validator");


const router = new Router()
router.post("/",validator("bikeInfo"), addBikeInfo)
router.get("/", getBikeInfos);
router.get("/:id", getBikeInfo);
router.put("/:id", updateBikeInfo);
router.delete("/:id", deleteBikeInfo);

module.exports = () => router.routes()