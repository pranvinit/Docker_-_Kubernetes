import jwt from "jsonwebtoken";

export const createTokenUser = (user) => {
  const { user_id, name, email } = user;
  return { id: user_id, name, email };
};

const createJWT = (tokenUser) => {};
