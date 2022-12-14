const ADSmanagment = require("../models/AdsManagment");
const ApiError = require("../errors/ApiError");

const getADSmanagments = async (ctx) => {
  try {
    const adsManagment = await ADSmanagment.findAll();
    ctx.ok(200, adsManagment);
  } catch (error) {
    console.log(error);
    ctx.error(500);
    throw error;
  }
};

const getADSmanagment = async (ctx) => {
  try {
    const adsManagment = await ADSmanagment.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = adsManagment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addADSmanagment = async (ctx) => {
  try {
    const { ad_name, shop_id, banner_image, description, amount, user_id } =
      ctx.request.body;
    const adsManagment = ADSmanagment.create({
      ad_name,
      shop_id,
      banner_image,
      description,
      amount,
      user_id,
    });
    ctx.status = 201;
    ctx.body = "New ADS managment added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateADSmanagment = async (ctx) => {
  try {
    await ADSmanagment.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    ctx.status = 201;
    ctx.body = "ADS managment updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteADSmanagment = async (ctx) => {
  try {
    await ADSmanagment.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "ADS managment deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  addADSmanagment,
  getADSmanagment,
  getADSmanagments,
  updateADSmanagment,
  deleteADSmanagment,
};
