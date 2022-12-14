const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../middleware/JwtService");
const ApiError = require("../errors/ApiError");
const device_detector = require("device-detector")

const getUsers = async (ctx) => {
  try {
    const users = await User.findAll();
    ctx.status = 201;
    ctx.body = users;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addUser = async (ctx) => {
  try {
    const { username, password, avatar, fullname, contact, email } =
      ctx.request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      avatar,
      fullname,
      contact,
      email,
    });
    ctx.status = 201;
    ctx.body = "New user added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateUser = async (ctx) => {
  try {
    await User.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "User updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteUser = async (ctx) => {
  try {
    await User.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "User deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const loginUser = async (ctx) => {
  try {
    const { username, password, email } = ctx.request.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return (ctx.body = "Username or password is incorrect");
    }
    const emailcheck = await User.findOne({ where: { email } });
    if (!emailcheck) {
      return (ctx.body = "Email or password is incorrect");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return (ctx.body = "Email or password is incorrect");
    const payload = {
      id: user._id,
      user_category_id: user.user_category_id,
      status: user.status,
    };
    const tokens = jwt.generateTokens(payload);
    ctx.body = tokens;
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
  } catch (error) {
    ctx.error(500);
  }
};

const logoutUser = async (ctx, res) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");
    console.log(refreshToken);
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
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
