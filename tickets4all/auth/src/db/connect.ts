const db = require("../models");

export const connectDB = async () => {
  await db.sequelize.sync({ force: true });
  return db.sequelize.authenticate();
};
