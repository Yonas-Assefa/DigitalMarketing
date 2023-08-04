const Joi = require('joi');

// Validation schema for adding a product
const addProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    amount: Joi.number().integer().min(1).required(),
    soldout: Joi.boolean().required(),
   
  });


// Validation schema for updating a product
const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    amount: Joi.number().integer().min(1),
    soldout: Joi.boolean(),
  }).min(1); // At least one field should be present for update


// Validation schema for getting all products with optional pagination query
const getAllProductsSchema = Joi.object({
    p: Joi.number().integer().min(0), // Optional pagination parameter
  });


// Validation schema for getting a product by ID
const getProductSchema = Joi.object({
    id: Joi.string().required(),
  });



module.exports = {
addProductSchema,
updateProductSchema,
getProductSchema,
getAllProductsSchema

};

