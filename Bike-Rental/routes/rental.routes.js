const Router = require("@koa/router")
const { getRentals, getRental, addRental, updateRental, deleteRental } = require("../controller/rental.controller")
const validator = require("../middleware/validator");


const router = new Router()
router.get("/", getRentals);
router.get("/:id", getRental);
router.post("/",validator("rental") ,addRental);
router.put("/:id", updateRental);
router.delete("/:id", deleteRental);
  
  
module.exports = () => router.routes();