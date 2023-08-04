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



module.exports = {
  signupSchema,
};
