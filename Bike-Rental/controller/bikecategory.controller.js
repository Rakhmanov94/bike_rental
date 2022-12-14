const BikeCategory = require("../models/Bikecategory");
const ApiError = require("../errors/ApiError");

const getBikeCategories = async (ctx) => {
  try {
    const bike_category = await BikeCategory.findAll();
    ctx.ok(200, bike_category);
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getBikeCategory = async (ctx) => {
  try {
    const bike_category = await BikeCategory.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = bike_category;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addBikeCategory = async (ctx) => {
  try {
    const { category_name, description } = ctx.request.body;
    const bike_category = BikeCategory.create({ category_name, description });
    ctx.status = 201;
    ctx.body = "New bike category added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateBikeCategory = async (ctx) => {
  try {
    await BikeCategory.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Bike category updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteBikeCategory = async (ctx) => {
  try {
    await BikeCategory.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Bike category deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  addBikeCategory,
  getBikeCategory,
  getBikeCategories,
  updateBikeCategory,
  deleteBikeCategory,
};
