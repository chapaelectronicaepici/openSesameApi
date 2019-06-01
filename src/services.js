import jwt from "jsonwebtoken";
import moment from "moment";
import config from "./config";

export const createToken = user => {
  const payload = {
    sub: user._id,
    data: {
      role: user.role,
      id: user._id
    },
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };
  return jwt.sign(payload, config.SECRET);
};
