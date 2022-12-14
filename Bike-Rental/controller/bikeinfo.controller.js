const BikeInfo = require("../models/Bikeinfo");
const ApiError = require("../errors/ApiError");

const getBikeInfos = async (ctx) => {
  try {
    const bike_info = await BikeInfo.findAll();
    ctx.status = 201;
    ctx.body = bike_info;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getBikeInfo = async (ctx) => {
  try {
    const bike_info = await BikeInfo.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = bike_info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addBikeInfo = async (ctx) => {
  try {
    const {
    bike_category_id,
    shop_id,
    bike_name,
    specs,
    rent_price,
    user_id,
    } = ctx.request.body;
    const bike_info = BikeInfo.create({
      bike_category_id,
      shop_id,
      bike_name,
      specs,
      rent_price,
      user_id,
    });
    ctx.status = 201;
    ctx.body = "New bike info added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateBikeInfo = async (ctx) => {
  try {
    await BikeInfo.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.status = 201;
    ctx.body = "Bike info updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteBikeInfo = async (ctx) => {
  try {
    await BikeInfo.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Bike info deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  addBikeInfo,
  getBikeInfo,
  getBikeInfos,
  updateBikeInfo,
  deleteBikeInfo,
};
