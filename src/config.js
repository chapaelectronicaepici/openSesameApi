import dotenv from "dotenv";
dotenv.config();
export default {
  DBHOST: process.env.MONGO_DATABASE,
  DBOPTIONS: {
    useNewUrlParser: true
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  PORT: process.env.PORT
};
