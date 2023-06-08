import Joi from "joi";

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required(),
  password: Joi.string().required().min(8),
});

export default loginValidationSchema;
