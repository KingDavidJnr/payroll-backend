import Joi from "joi";

// Define the JOI validation schema for the disbursement
const disbursementSchema = Joi.array()
  .min(1)
  .items(
    Joi.object({
      name: Joi.string().required(),
      employeeId: Joi.number().required(),
      jobRole: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
      appraisalScore: Joi.number().required(),
      totalWorkingHours: Joi.number().required(),
      yearsOfService: Joi.number().required(),
      tax: Joi.number().required(),
      monthlyBasePay: Joi.number().required(),
      bonus: Joi.number().required(),
      totalDeduction: Joi.number().required(),
      totalSalary: Joi.number().required(),
      netSalary: Joi.number().required(),
      month: Joi.string().required(),
      year: Joi.number().required(),
      loan: Joi.number(),
      allowance: Joi.number(),
    })
  );

export default disbursementSchema;
