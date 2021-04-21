const models = require("./models");
const yup = require("yup");
const answers = require("./../../services/answers");
const crypto = require("./../../services/crypto");
const token = require("./../../services/token");
const emails = require("./../../services/emails");

module.exports = {
  list: async (req, res, next) => {
    const schema = yup.object().shape({
      page: yup.number().required().positive().integer().min(1),
      filter: yup.string(),
      limit: yup.number().required().positive().integer().max(20),
    });
    const valido = await schema.isValid(req.query);
    if (!valido) {
      schema.validate(req.query).catch((error) => {
        answers.badRequest(error, res);
      });
      return;
    }
    try {
      const data = await models.list(
        req.query.page,
        req.query.limit,
        req.query.filter || ""
      );
      answers.success(data, res);
    } catch (error) {
      next(error);
    }
  },
  detail: async (req, res, next) => {
    const schema = yup.object().shape({
      id: yup.number().required().positive().integer().min(1),
    });
    const valido = await schema.isValid(req.params);
    if (!valido) {
      schema.validate(req.params).catch((error) => {
        answers.badRequest(error, res);
      });
      return;
    }
    try {
      const data = await models.detail(req.params.id);
      answers.success(data, res);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    const valido = await schema.isValid(req.body);
    if (!valido) {
      schema.validate(req.body).catch((error) => {
        answers.badRequest(error, res);
      });
      return;
    }
    const oldUser = await models.searchEmail(req.body.email);
    if (oldUser) {
      answers.badRequest({ error: "email exits in system" }, res);
      return;
    }
    req.body.password = crypto.encrypt(req.body.password);
    try {
      const data = await models.create(
        req.body.name,
        req.body.last_name,
        req.body.email,
        req.body.password
      );
      const responseMail = await emails.send(['dbarrerapalacios@gmail.com'], 'prueba de correo desde node', 'hola esto es un correo desde node');
     console.log("mail", responseMail);
     
      answers.success(data, res);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    const valido = await schema.isValid(req.body);
    if (!valido) {
      schema.validate(req.body).catch((error) => {
        answers.badRequest(error, res);
      });
      return;
    }
    const oldUser = await models.searchEmail(req.body.email);
    if (!oldUser) {
      answers.badRequest({ error: "User no register" }, res);
      return;
    }
    if (!crypto.check(req.body.password, oldUser.password)) {
      answers.badRequest({ error: "Incorrect password" }, res);
      return;
    }
    const newToken = token.createToken(oldUser.id);
    const response = { token: newToken, name: oldUser.name };
    answers.success(response, res);
  },
};
