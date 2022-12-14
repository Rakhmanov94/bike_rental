const Koa = require("koa");
const app = new Koa();
const config = require("config");
const router = require("./routes/index.routes");
const bodyParser = require("koa-bodyparser");
const PORT = config.get("port") || 3000;
const koaStatic = require("koa-static");
const cors = require("@koa/cors");
const sequelize = require("./config/db");
const ErrorHandling = require("./middleware/ErrorHandling");
const logger = require("koa-logger");

app.use(koaStatic(__dirname + "/public"));
app.use(bodyParser());
app.use(cors());
app.use(logger());
// app.use(ErrorHandling())

app.use(router);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server run in ${PORT} port`);
    });
  } catch (error) {
    // console.log(error);
    console.log("Serverda xatolik");
  }
}
start();
