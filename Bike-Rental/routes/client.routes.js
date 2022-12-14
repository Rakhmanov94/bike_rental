const Router = require("@koa/router")
const { addClient, getClients, getClient, updateClient, deleteClient, loginClient, logoutClient } = require("../controller/client.controller")
const clientPolis = require("../middleware/clientPolice")
const validator = require("../middleware/validator");

const router = new Router()
router.post("/",validator("client") ,addClient)
router.post("/login", loginClient);
router.post("/logout", logoutClient);
router.get("/", clientPolis, getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = () => router.routes()