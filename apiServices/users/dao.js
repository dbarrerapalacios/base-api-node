const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = require("./../../databaseModels/user");
module.exports = {
  list: async (page, limit, filter) => {
    const data = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${filter}%`,
            },
          },
          {
            last_name: {
              [Op.like]: `%${filter}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${filter}%`,
            },
          },
        ],
      },
      limit: limit,
      offset: (page - 1) * limit,
    });
    return data;
  },
  detail: async (id) => {
    const data = await User.findOne({
      where: { id: id },
    });
    return data;
  },
  searchEmail: async (email) => {
    const data = await User.findOne({
      where: { email: email },
    });
    return data;
  },
  create: async (name, lastName, email, password) => {
      const data = await User.create({
        name: name,
        last_name: lastName,
        email: email,
        password: password,
      });
    return data;
  },
  // edit: async (
  //   id,
  //   info ={ name = null, lastName = null, email = null, password = null }
  // ) => {
  //   info.forEach(element=>{

  //   })
  //   let object = {}

  //   const data = await User.update(
  //     { name: name, last_name: lastName, email: email, password: password },
  //     {
  //       where: {
  //         id: id,
  //       },
  //     }
  //   );
  //   return data.id;
  // },
};
