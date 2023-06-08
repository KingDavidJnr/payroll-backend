import Joi from "joi";

const signupValidationSchema = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required(),
  password: Joi.string().required().min(8),
  role: Joi.string().optional(),
});

export default signupValidationSchema;
