const Penalty = require("../models/Penalty");
const ApiError = require("../errors/ApiError");

const getPenalties = async (ctx) => {
  try {
    const penalties = await Penalty.findAll();
    ctx.status = 200;
    ctx.body = penalties;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = penalty;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addPenalty = async (ctx) => {
  try {
    const {
      rental_id,
      penalty_amount,
      payment_status,
      remarks,
      paid_by,
      user_id,
    } = ctx.request.body;
    const penalty = await Penalty.create({
      rental_id,
      penalty_amount,
      payment_status,
      remarks,
      paid_by,
      user_id,
    });
    ctx.status = 201;
    ctx.body = "Penalty is added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updatePenalty = async (ctx) => {
  try {
    await Penalty.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Penalty updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deletePenalty = async (ctx) => {
  try {
    await Penalty.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Penalty deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  getPenalties,
  getPenalty,
  addPenalty,
  updatePenalty,
  deletePenalty,
};
