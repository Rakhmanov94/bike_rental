const Client = require("../models/Client");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/JwtService");
const ApiError = require("../errors/ApiError");
const DeviceDetector = require("node-device-detector");
const config = require("config")

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});


const getClients = async (ctx) => {
  try {
    const client = await Client.findAll();
    ctx.status = 201;
    ctx.body = client;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addClient = async (ctx) => {
  try {
    const {
      client_code,
      avatar,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password,
    } = ctx.request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const new_client = Client.create({
      client_code,
      avatar,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password: hashedPassword,
    });
    ctx.status = 201;
    ctx.body = "New client added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateClient = async (ctx) => {
  try {
    await Client.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.status = 201;
    ctx.body = "Client updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteClient = async (ctx) => {
  try {
    await Client.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Client deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const loginClient = async (ctx) => {
  try {
    const { client_name, email_address, password } = ctx.request.body;
    const client = await Client.findOne({ where: { client_name } });
    if (!client) {
      return (ctx.body = "Client name or password is incorrect");
    }
    const email = await Client.findOne({ where: { email_address } });
    if (!email) {
      return (ctx.body = "Email or password is incorrect");
    }
    const validPassword = bcrypt.compareSync(password, client.password);
    if (!validPassword) return (ctx.body = "Email or password is incorrect");
    const payload = {
      id: client._id,
      status: client.status,
    };
    const tokens = jwt.generateTokens(payload);
    ctx.body = tokens;
    const userAgent = ctx.request.headers["user-agent"];
    const result = detector.detect(userAgent);
    const addtoken = await Token.create({
      user_id: client.id,
      user_os: JSON.stringify(result.os),
      user_device: JSON.stringify(result.device),
      token: tokens.refreshToken,
    });
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
    ctx.error(500);
  }
};

const logoutClient = async (ctx, res) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    console.log(refreshToken);
    await Token.destroy({ where: { token: refreshToken } });
    ctx.cookies.set("refreshToken", "");
    ctx.ok(200, "Logout success");
  } catch (err) {
    ApiError.internal(ctx, {
      message: err,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  addClient,
  getClient,
  getClients,
  updateClient,
  deleteClient,
  loginClient,
  logoutClient,
};
