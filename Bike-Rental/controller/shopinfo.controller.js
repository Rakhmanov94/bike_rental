const ShopInfo = require("../models/Shopinfo");
const ApiError = require("../errors/ApiError");

const getShopInfos = async (ctx) => {
  try {
    const users = await ShopInfo.findAll();
    ctx.status = 201;
    ctx.body = users;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getShopInfo = async (ctx) => {
  try {
    const shopInfo = await ShopInfo.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = shopInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addShopInfo = async (ctx) => {
  try {
    const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    } = ctx.request.body;
    const test = await ShopInfo.findOne({ where: { shop_name } });
    if (test) {
      return (ctx.body =
        "You must be enter new shop name. This shop name is exists");
    }
    const user = await ShopInfo.create({
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    });
    ctx.ok(200, { friendlyMsg: "New shop info added" });
    // ctx.body = ;
  } catch (error) {
    console.log(error);
    ctx.error(500);
    throw error;
  }
};

const updateShopInfo = async (ctx) => {
  try {
    await ShopInfo.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "ShopInfo updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteShopInfo = async (ctx) => {
  try {
    await ShopInfo.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "ShopInfo deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  addShopInfo,
  getShopInfo,
  getShopInfos,
  updateShopInfo,
  deleteShopInfo,
};
