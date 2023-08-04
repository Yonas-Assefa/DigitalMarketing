const Joi = require('joi');

// Validation schema for user signup
const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().default('example@gmail.com'),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string().valid('customer', 'sse', 'farmer')).default(['customer']),
  profilePicture: Joi.string().default('https://via.placeholder.com/250'),
  identifictionPicture: Joi.string().when('roles', {
    is: Joi.array().items(Joi.string().valid('sse', 'farmer')).required(),
    then: Joi.string().required(),
    otherwise: Joi.string().optional().default(null),
  }),
  verified: Joi.boolean().default(false),
});

// Validation schema for user signin
const signinSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
};
