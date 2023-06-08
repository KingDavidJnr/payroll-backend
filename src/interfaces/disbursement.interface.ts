export interface IDisbursement {
  name: string; // Employee's name
  employeeId: number; // Employee's ID
  jobRole: string; // Employee's job role
  email: string; // Employee's email address
  appraisalScore: number; // Employee's appraisal score
  totalWorkingHours: number; // Employee's total working hours
  yearsOfService: number; // Employee's years of service
  tax: number; // Tax policy
  monthlyBasePay: number; // Employee's monthly base pay
  emailStatus?: string;
  bonus: number;
  totalDeduction: number;
  totalSalary: number;
  netSalary: number;
  month: string;
  year: number;
  loan?: number;
  allowance?: number;
  netSalaryInWords?: string;
}
