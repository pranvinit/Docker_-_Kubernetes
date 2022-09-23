const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);

  res.status(500).send(err);
};

module.exports = errorHandlerMiddleware;
