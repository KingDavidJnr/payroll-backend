import dotenv from "dotenv";
dotenv.config();

const mailConfig = {
  host: process.env.EMAIL_HOST as string,
  port: parseInt(process.env.EMAIL_PORT as string),
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME as string,
    pass: process.env.EMAIL_PWD as string,
  },
  mailFrom: process.env.MAIL_FROM as string,
};

export default mailConfig;
