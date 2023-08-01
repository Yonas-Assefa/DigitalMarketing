const Joi = require('joi');
const { mongoose } = require("mongoose");

const signupSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, default: "example@gmail.com" },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ["customer"] },
    profilePicture: { type: String, default: "https://via.placeholder.com/250" },
    identifictionPicture: { type: String, required: isSseOrFarmer },
    verified: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

// Helper function to check if 'sse' or 'farmer' exists in roles array
function isSseOrFarmer(value, helpers) {
  if (value.includes('sse') || value.includes('farmer')) {
    return value;
  }
  return helpers.error('any.only', { values: ['sse', 'farmer'] });
}

// Define the Joi schema to match the signupSchema
const signupJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().default("example@gmail.com"),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).default(["customer"]),
  profilePicture: Joi.string().default("https://via.placeholder.com/250"),
  identifictionPicture: Joi.string().custom(isSseOrFarmer).required(),
  verified: Joi.boolean().default(false)
});

module.exports = {
  signupSchema,
  signupJoiSchema
};
