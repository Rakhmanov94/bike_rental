const Router = require("@koa/router")
const { getUsergroups, getUsergroup, addUsergroup, updateUsergroup, deleteUsergroup } = require("../controller/usergroup.controller");
const validator = require("../middleware/validator");


const router = new Router()
router.get("/", getUsergroups);
router.get("/:id", getUsergroup);
router.post("/", validator("userGroup"), addUsergroup);
router.put("/:id", updateUsergroup);
router.delete("/:id", deleteUsergroup);
  
  
module.exports = () => router.routes();