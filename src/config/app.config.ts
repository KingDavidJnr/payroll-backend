import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  PORT: parseInt(process.env.PORT as string) || 5000,
  HOST: (process.env.HOST as string) || "localhost",
  NODE_ENV: process.env.NODE_ENV as string,
};

export default appConfig;
