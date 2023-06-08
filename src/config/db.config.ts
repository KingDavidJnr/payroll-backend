import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  DATABASE_URI: process.env.DATABASE_URI as string,
  TEST_DATABASE: process.env.TEST_DATABASE as string,
};

export default dbConfig;
