module.exports = {
  badRequest: (error, res) => {
    res.status("400").set().json({ status: "400", message: error });
  },
  invalidCredentials: function (res) {
    res
      .status("401")
      .set()
      .json({ status: "401", message: "invalid credentiales" });
  },
  insufficientPermissions: function (res) {
    res
      .status("403")
      .set()
      .json({ status: "403", message: "insufficient permissions" });
  },
  success: function (body, res) {
    res.status("200").set().json(body);
  },
};
