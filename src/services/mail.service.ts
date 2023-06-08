import { IDisbursement } from "./../interfaces/disbursement.interface";
import { ISendMail } from "../interfaces/sendmail.interface";
import nodemailer from "nodemailer";
import { mailConfig } from "../config";
import { ICreateTransport } from "../interfaces/mailTransport.interface";
import path from "path";
import ejs from "ejs";

type PaySlipProps = Partial<IDisbursement> & {
  month: string;
  year: number;
};

class MailService {
  async generateEmailContent(fileName: string, tempObj: PaySlipProps) {
    const template = await ejs.renderFile(
      path.join(process.cwd(), "src/views", `${fileName}.ejs`),
      {
        ...tempObj,
      }
    );

    return template;
  }

  async createTransport(transObj: ICreateTransport) {
    return nodemailer.createTransport({
      ...transObj,
    });
  }

  async sendMail(mailObj: ISendMail) {
    const { auth, host, port, secure } = mailConfig;

    const transporter = await this.createTransport({ host, port, secure, auth });

    const { from, to, subject, attachments, html, text } = mailObj;

    return transporter.sendMail({ from, to, subject, html, text, attachments });
  }
}

export default new MailService();
