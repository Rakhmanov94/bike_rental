const Router = require("@koa/router")
const { addADSmanagment, getADSmanagments, getADSmanagment, updateADSmanagment, deleteADSmanagment } = require("../controller/adsmanagment.controller")
const validator = require("../middleware/validator");

const router = new Router()
router.post("/", validator("adsManagement"), addADSmanagment);
router.get("/", getADSmanagments);
router.get("/:id", getADSmanagment);
router.put("/:id", updateADSmanagment);
router.delete("/:id", deleteADSmanagment);

module.exports = () => router.routes()