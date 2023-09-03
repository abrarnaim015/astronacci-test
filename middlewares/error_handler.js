module.exports = error_handler = (err, req, res, next) => {
  let code = err.status || 500;
  let message = err.message || "Internal Server Error";

  const result = {
    meta: {
      status: "Error",
      code,
      msg: message,
      data: new Date(),
    },
    data: null,
    error: err.errors || err,
  };
  res.status(code).json(result);
};
