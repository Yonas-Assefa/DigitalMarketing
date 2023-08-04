const UserModel = require("../../models/auth/signup.model");
const AuthValidation = require('../../validations/auth.validation');

const signup = async (req, res) => {
    try {
        // Validate the request data against the Joi schema
        const { error, value } = AuthValidation.signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details.map((err) => err.message) 
            });
        }
    

        // If validation passes, create a new user using the validated data
        const newUser = new UserModel(value);

        // Save the new user to the database
        const response = await newUser.save();

        // Send a successful response
        res.status(201).json({ message: "User successfully registered", data: response });
    } catch (err) {
        // If an error occurs during saving the user, send a 500 Internal Server Error response
        res.status(500).json({ message: err.message });
    }
};

module.exports = signup;
