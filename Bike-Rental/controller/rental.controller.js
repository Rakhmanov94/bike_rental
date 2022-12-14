const Rental = require("../models/Rental");
const ApiError = require("../errors/ApiError");

const getRentals = async (ctx) => {
  try {
    const rentals = await Rental.findAll();
    ctx.status = 200;
    ctx.body = rentals;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = rental;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addRental = async (ctx) => {
  try {
    const { bike_id, client_id, total_amount, remarks, user_id } =
      ctx.request.body;
    const rental = await Rental.create({
      bike_id,
      client_id,
      total_amount,
      remarks,
      user_id,
    });
    ctx.status = 201;
    ctx.body = "Rental is added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateRental = async (ctx) => {
  try {
    await Rental.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Rental updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteRental = async (ctx) => {
  try {
    await Rental.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Rental deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  getRentals,
  getRental,
  addRental,
  updateRental,
  deleteRental,
};
