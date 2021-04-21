const nodemailer = require("nodemailer");
const config = require("config");

module.exports = {
  transporter: nodemailer.createTransport({
    host: config.get("email.host"),
    port: config.get("email.port"),
    secure: config.get("email.secure"), // true for 465, false for other ports
    auth: {
      user: config.get("email.user"),
      pass: config.get("email.pass"),
    },
  }),
  from: '"Fred Foo" <foo@example.com>',
  headerTemplate: ``,
  footerTemplate: ``,
  bodyHeaderTemplate: ``,
  bodyFooterTemplate: ``,
  send: async (mails = [], subject, message) => {
    try {
      const response = await this.transporter.sendMail({
        from: this.from, // sender address
        to: mails.join(", "), // list of receivers
        subject: subject, // Subject line
        html: `${this.headerTemplate}
        ${this.bodyHeaderTemplate}
        ${message}
        ${this.bodyFooterTemplate}
        ${this.footerTemplate}`,
      });
      return response;
    } catch (error) {
      return false;
    }
  },
};
