const Router = require("@koa/router")
const {addBikeCategory, getBikeCategories, getBikeCategory, updateBikeCategory, deleteBikeCategory } = require("../controller/bikecategory.controller")
const validator = require("../middleware/validator");


const router = new Router()
router.post("/", validator("bikeCategory"), addBikeCategory);
router.get("/", getBikeCategories)
router.get("/:id", getBikeCategory)
router.put("/:id", updateBikeCategory);
router.delete("/:id", deleteBikeCategory);

module.exports = () => router.routes()