module.exports.error404 = (req, res, next) => {
  res.status(404);
  res.json({ error: "route no search" });
};

module.exports.error500 = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.error });
};

module.exports.cors = (err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-access-llave, x-access-token, Content-Type, Accept"
  );
  res.header(
    "Access-control-expose-headers",
    "X-Total-Count, X-Number-Page, X-token"
  );
  next();
};

module.exports.options = (err, req, res, next) => {
    if (req.method === "OPTIONS") {
      res.status(200);
      res.end();
    } else {
      next();
    }
  };
