import dotenv from 'dotenv';
dotenv.config();
export default {
  DBHOST: process.env.MONGO_DATABASE,
  DBOPTIONS: {
    useNewUrlParser: true
  },
  PORT: 8000
};
