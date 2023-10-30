import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send("User with this email already exists, please login");
    }
    const hashedPassword = await hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User with this email does not exist");
    }
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).send("Password is incorrect");
    }

    return res.status(200).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
