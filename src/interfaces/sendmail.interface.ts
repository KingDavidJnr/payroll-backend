import Mail from "nodemailer/lib/mailer";
import internal from "stream";

export interface ISendMail {
  from?: string | Mail.Address;
  to?: string | Mail.Address | Array<string> | (string | Mail.Address)[];
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
  subject?: string;
  text?: string | Mail.AttachmentLike | Buffer | internal.Readable;
  html?: string | Buffer | internal.Readable | Mail.AttachmentLike;
  template?: string;
  context?: object;
  attachments?: Mail.Attachment[];
}
