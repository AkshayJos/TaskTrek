import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

dotenv.config();

export const signupController = async (req, res, next) => {
  try {
    const { username, name, password, userPicture } = req.body;

    if (!username || !name || !password) {
      next(ErrorHandler.validationError("All fields are required."));
      return;
    }

    let user = await User.findOne({ username: username });
    if (user) {
      next(ErrorHandler.validationError("Username already exists."));
      return;
    }

    //  const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);

    user = {
      username: username,
      name: name,
      password: hashedPassword,
      userPicture: userPicture || "",
    };

    const newUser = new User(user);
    await newUser.save();

    return res.status(200).json({ msg: "signup Succesfull" });
  } catch (error) {
    console.log(error);
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again"
      )
    );
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next(ErrorHandler.validationError("All fields are required."));
      return;
    }

    let user = await User.findOne({ username: username });
    if (!user) {
      next(ErrorHandler.validationError("Username does not exist."));
      return;
    }

    let match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "24h" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        _id : user._id,
        name: user.name,
        username: user.username,
        userPicture: user.userPicture,
      });
    } else {
      next(ErrorHandler.validationError("Incorrect Password !!"));
    }
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again"
      )
    );
  }
};

