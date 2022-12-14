const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { encode, decode } = require("../services/crypt");
const otpGenerator = require("otp-generator");
const ApiError = require("../errors/ApiError");

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const newOTP = async (req, res) => {
  const { phone_number } = req.body;
  // Generate OTP
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const now = new Date();
  const expiration_time = AddMinutesToDate(now, 3);
  const newOtp = await pool.query(
    `INSERT INTO otp (id, otp, expiration_time) VALUES ($1, $2, $3) RETURNING id;`,
    [uuidv4(), otp, expiration_time]
  );
  const details = {
    timestamp: now,
    check: phone_number,
    success: true,
    message: "OTP sent to user",
    otp_id: newOtp.rows[0].id,
  };
  console.log(details);
  const encoded = await encode(JSON.stringify(details));
  return res.json({ Status: "Success", Details: encoded });
};

const verifyOTP = async (req, res) => {
  const { verification_key, otp, check } = req.body;
  var currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (err) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
    // return res.error(401, { friendlyMsg: "This email already exists" });
  }
  var obj = JSON.parse(decoded);
  const check_obj = obj.check;
  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not sent to this particular  phone number",
    };
    return res.status(400).send(response);
  }
  let params = {
    id: obj.otp_id,
  };
  const otpResult = await pool.query(`select * from otp where id = $1;`, [
    params.id,
  ]);
  const result = otpResult.rows[0];
  if (result != null) {
    //Check if OTP is already used or not
    if (result.verified != true) {
      //Check if OTP is expired or not
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        //Check if OTP is equal to the OTP in the DB
        if (otp === result.otp) {
          let params_verified = {
            id: result.id,
            verified: true,
          };
          await pool.query(`UPDATE otp SET verified=$2 WHERE id = $1;`, [
            params_verified.id,
            params_verified.verified,
          ]);
          const clientResult = await pool.query(
            `select * from client where client_phone_number = $1;`,
            [check]
          );
          if (clientResult.rows.length == 0) {
            const response = {
              Status: "Success",
              Details: "new",
              Check: check,
            };
            return res.status(200).send(response);
          } else {
            const response = {
              Status: "Success",
              Details: "old",
              Check: check,
              ClientName: clientResult.rows[0].client_first_name,
            };
            return res.status(200).send(response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP NOT Matched" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Expired" };
        return res.status(400).send(response);
      }
    } else {
      const response = { Status: "Failure", Details: "OTP Already Used" };
      return res.status(400).send(response);
    }
  } else {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
  //res.ok(result);
};

module.exports = { newOTP, verifyOTP};
