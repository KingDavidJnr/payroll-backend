import Joi from "joi";

const userValidationSchema = Joi.object({
  firstname: Joi.string().optional(),
  surname: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim(),
  role: Joi.string().optional(),
});

export default userValidationSchema;
