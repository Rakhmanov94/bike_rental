const pool = require("../config/db");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/ApiError");

const addToken = async (req, res) => {
  try {
    const { user_id, user_os, user_device, token } = req.body;
    const newToken = await pool.query(
      `
      INSERT INTO token (user_id, user_os, user_device, token) values ($1, $2, $3, $4) RETURNING *
        `,
      [user_id, user_os, user_device, token]
    );
    res.ok(200, { friendlyMsg: "New token added" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Error in function addToken",
    });
  }
};

const getTokens = async (req, res) => {
  try {
    const tokens = await pool.query("SELECT * FROM token");
    res.ok(200, tokens.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Error in function getTokens",
    });
  }
};

const editToken = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, user_os, user_device, token } = req.body;
    const oldToken = await pool.query("SELECT * FROM token WHERE id = $1", [
      id,
    ]);
    const updatedAdmin = await pool.query(
      `
      UPDATE token SET 
      user_id=$1, user_os=$2, user_device=$3, token=$4 where id = $5 RETURNING *`,
      [
        user_id || oldToken.rows[0].user_id,
        user_os || oldToken.rows[0].user_os,
        user_device || oldToken.rows[0].user_device,
        token || oldToken.rows[0].token,
        id,
      ]
    );
    res.ok(200, {friendlyMsg:"Token updated"});
  } catch (error) {
    console.log(error);
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Error in function editToken",
    });
  }
};

const deleteToken = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(
      `
      delete from token where id = $1 RETURNING *`,
      [id]
    );
    res.ok(200, { friendlyMsg: "Token deleted" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Error in function deleteToken",
    });
  }
};

module.exports = {
  addToken,
  getTokens,
  editToken,
  deleteToken,
};
