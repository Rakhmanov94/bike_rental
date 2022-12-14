const Router = require("@koa/router")
const { getUsers, getUser, addUser, updateUser, deleteUser, loginUser, logoutUser } = require("../controller/user.controller")
const userPolice = require("../middleware/userPolice")
const validator = require("../middleware/validator")


const router = new Router()
router.get("/", userPolice, getUsers);
router.get("/:id", userPolice, getUser);
router.post("/", validator("user"), addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
  
  
module.exports = () => router.routes();