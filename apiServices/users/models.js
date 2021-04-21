const dao = require("./dao");
const formatter = require("./../../services/dataFromatter");

module.exports = {
  list: async (page, limit, filter) => {
    const data = await dao.list(page, limit, filter);
    return formatter.pager(
      formatter.formatList(data.rows, ["name", "last_name"]),
      parseInt(page),
      parseInt(limit),
      data.count
    );
  },
  detail: async (id) => {
    const data = await dao.detail(id);
    return formatter.formatObject(data, ["name", "last_name","email"])
  },
  searchEmail: async (email) => {
    const data = await dao.searchEmail(email);
    return formatter.formatObject(data, ["id","name","email","password"])
  },
  create: async (name, lastName, email, password) => {
    const data = await dao.create(name, lastName, email, password);
    return formatter.formatObject(data, ["id","name", "last_name","email"])
  },
};
