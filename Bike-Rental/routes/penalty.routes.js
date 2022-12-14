const Router = require("@koa/router")
const { getPenalties, getPenalty, addPenalty, updatePenalty, deletePenalty } = require("../controller/penalty.controller")
const validator = require("../middleware/validator");

const router = new Router()
router.get("/", getPenalties);
router.get("/:id",getPenalty)
router.post("/", validator("penalty"), addPenalty)
router.put("/:id", updatePenalty);
router.delete("/:id",  deletePenalty)
  
  
module.exports = () => router.routes();