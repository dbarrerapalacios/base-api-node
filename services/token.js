var jwt = require("jsonwebtoken");
var answers = require("./answers");
const config = require("config");
//https://www.npmjs.com/package/jsonwebtoken
module.exports = {
  createToken: (id) => {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {user: id},
      },
      config.get("token")
    );
    return token;
  },
  authentication: (req, res, next) => {
    const token = req.headers['Authorization'];
    if (token) {
      jwt.verify(token.split('Bearer ')[1], config.get("token"), function (err, decoded) {
        if (err) {
            answers.invalidCredentials("invalid token", res);
        } else {
          tmp.usuarioActual.id = decoded.id;
          next();
        }
      });
    } else {
      answers.insufficientPermissions("token required", res);
    }
  },
};
