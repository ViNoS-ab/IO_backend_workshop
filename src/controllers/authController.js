import "dotenv/config";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 24; //max age in seconds = 1 day

export async function signup(req, res) {
  const { username, email, password } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist)
      return res
        .status(400)
        .json({ status: 400, message: "email already exists" });

    const hashedPw = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPw,
      roadposition: [],
      exp: 0,
      notification: [],
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: MAX_AGE,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });

    res
      .status(201)
      .send(JSON.stringify({ username: user.username, id: user._id }));
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = email && (await User.findOne({ email: email }));
    if (!user) return res.status(404).send("incorrect email");

    const isMatch = password && (await bcrypt.compare(password, user.password));
    if (!isMatch) return res.status(400).send("wrong pasword");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: MAX_AGE,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });

    return res
      .status(200)
      .send(JSON.stringify({ username: user.username, id: user._id }));
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).send("you are logged out");
  } catch (error) {
    return res.status(500).send("try again later");
  }
}
