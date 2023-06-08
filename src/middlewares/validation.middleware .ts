/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import signupValidationSchema from "../schema/signup.schema";
import loginValidationSchema from "../schema/login.schema";
import userValidationSchema from "../schema/user.schema";
import disbursementSchema from "../schema/disburse.schema";

export const validateSignup: RequestHandler = async (req, res, next) => {
  try {
    await signupValidationSchema.validateAsync(
      {
        ...req.body,
      },
      { abortEarly: false, allowUnknown: false }
    );

    next();
  } catch (err: any) {
    err.statusCode = 401;
    next(err);
  }
};

export const validateLogin: RequestHandler = async (req, res, next) => {
  try {
    await loginValidationSchema.validateAsync(
      { ...req.body },
      { abortEarly: false, allowUnknown: false }
    );

    next();
  } catch (err: any) {
    err.statusCode = 401;
    next(err);
  }
};

export const validateUser: RequestHandler = async (req, res, next) => {
  try {
    await userValidationSchema.validateAsync(
      { ...req.body },
      { abortEarly: false, allowUnknown: false }
    );

    next();
  } catch (err: any) {
    err.statusCode = 401;
    next(err);
  }
};

export const validateDisbursement: RequestHandler = async (req, res, next) => {
  try {
    await disbursementSchema.validateAsync(req.body, { abortEarly: false, allowUnknown: false });

    next();
  } catch (err: any) {
    console.log(err);
    err.statusCode = 401;
    next(err);
  }
};
