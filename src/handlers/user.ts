import prisma from "../db";
import { BaseError } from "../errors/baseError";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);

    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.username },
    });
    console.log("createNewUser");

    if (existingUser) {
      throw new BaseError("input", "Error: user already exists");
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.username,
        password: hash,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send({ message: "Invalid email or password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
