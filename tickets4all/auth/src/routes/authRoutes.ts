import { Router } from "express";
import db from "../models";
import { body, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors";
const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isString().withMessage("Invalid password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array());
    }
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (user.password !== password) {
      res.json(400).json([{ error: "Invalid credentials." }]);
    }

    res.status(200).json(user);
  }
);

router.post(
  "/register",
  [
    body("name").isString().withMessage("Invalid name"),
    body("email").isString().withMessage("Invalid email"),
    body("password").isString().withMessage("Invalid password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array());
    }

    const { name, email, password } = req.body;
    const user = await db.User.create({ name, email, password });
    res.status(201).json({ user });
  }
);

router.get("/current-user", (req, res) => {
  res.send("current-user route");
});

router.get("/logout", (req, res) => {
  res.send("logout route");
});

export { router as authRouter };
