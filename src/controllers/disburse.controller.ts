import { titleCase } from "./../utils/textCase";
import { saveDisbursement } from "./../services/disburse.service";
import { Request, Response } from "express";
import { IDisbursement } from "../interfaces/disbursement.interface";
import mailService from "../services/mail.service";
import { mailConfig } from "../config";
import converter from "number-to-words";

export const createDisbursement = async (req: Request, res: Response) => {
  try {
    const reqBody: IDisbursement[] = req.body;

    // loop through each employee record
    reqBody.forEach(async (elem) => {
      const content = await mailService.generateEmailContent("payslip.temp", {
        ...elem,
        name: titleCase(elem.name),
        loan: elem?.loan ?? 0,
        allowance: elem?.allowance ?? 0,
        month: titleCase(elem.month),
        netSalaryInWords: titleCase(converter.toWords(elem.netSalary)),
      });

      // send mail to employee emails
      const mail = await mailService.sendMail({
        from: `Payme LLC <${mailConfig.mailFrom}>`,
        to: elem.email,
        subject: "Payslip for January 2023",
        html: content,
      });

      // store payroll data in database
      if (mail.response.includes("250 OK")) {
        await saveDisbursement({ ...elem, emailStatus: "Sent" });
      } else {
        await saveDisbursement({ ...elem, emailStatus: "Error" });
      }
    });

    res.status(200).json({ message: "Payslip dispatched successfully" });
  } catch (error: any) {
    console.error("Error creating disbursement:", error);
    res.status(500).json({ error: "An error occurred while creating the disbursement" });
  }
};
