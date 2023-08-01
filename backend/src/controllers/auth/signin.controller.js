const Joi = require('joi');
const jwt = require("jsonwebtoken");
const { signinJoiSchema } = require("../../models/auth/user.model"); // Assuming you have a separate model for sign-in data
const UserModel = require("../../models/auth/user.model");
const secretKey = process.env.SECRET_KEY;

const signin = async (req, res) => {
  try {
    // Validate the request data against the Joi schema
    const { error, value } = signinJoiSchema.validate(req.body);
    if (error) {
      // If validation fails, send a 400 Bad Request response with the validation error message
      res.status(400).json({ message: error.message });
      return;
    }

    const user = await UserModel.findOne({ phoneNumber: value.phoneNumber });

    if (!user) {
      res.status(404).json({ message: `User Not found` });
      return;
    }

    let isPasswordValid = value.password === user.password;
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
    res.status(201).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
      identifictionPicture: user.identifictionPicture,
      verified: true,
      roles: user.roles,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = signin;


