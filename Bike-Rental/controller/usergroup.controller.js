const Usergroup = require("../models/Usergroup");
const ApiError = require("../errors/ApiError");

const getUsergroups = async (ctx) => {
  try {
    const usergroups = await Usergroup.findAll();
    ctx.status = 201;
    ctx.body = usergroups;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const getUsergroup = async (ctx) => {
  try {
    const usergroup = await Usergroup.findByPk(ctx.params.id);
    ctx.status = 200;
    ctx.body = usergroup;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addUsergroup = async (ctx) => {
  try {
    const { group_name, description } = ctx.request.body;
    const usergroup = await Usergroup.create({
      group_name,
      description,
    });
    ctx.status = 201;
    ctx.body = "New usergroup added";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const updateUsergroup = async (ctx) => {
  try {
    await Usergroup.update(ctx.request.body, { where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Usergroup updated";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};

const deleteUsergroup = async (ctx) => {
  try {
    await Usergroup.destroy({ where: { id: ctx.params.id } });
    ctx.status = 201;
    ctx.body = "Usergroup deleted";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    throw error;
  }
};



module.exports = {
  addUsergroup,
  getUsergroup,
  getUsergroups,
  updateUsergroup,
  deleteUsergroup,
};
