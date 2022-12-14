const Payment = require("../models/Payment");
const ApiError = require("../errors/ApiError");

const getPayments = async (ctx) => {
  try {
    const payments = await Payment.findAll();
    ctx.status = 201;
    ctx.body = payments;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getPayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = payment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addPayment = async (ctx) => {
  try {
    const { rental_id, payment_type, paid_by, payment_date, remarks, user_id } =  ctx.request.body;
    const payment = await Payment.create({
      rental_id,
      payment_type,
      paid_by,
      payment_date,
      remarks,
      user_id,
    });
    ctx.status = 201;
    ctx.body = "New payment added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updatePayment = async (ctx) => {
  try {
    await Payment.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Payment updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deletePayment = async (ctx) => {
  try {
    await Payment.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Payment deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

module.exports = {
  addPayment,
  getPayment,
  getPayments,
  updatePayment,
  deletePayment,
};
