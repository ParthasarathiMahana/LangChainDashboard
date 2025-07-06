const ProductModel = require("../models/Product.model")

const getAllProduct = async () => {
    try {
        const response = await ProductModel.find()
        return response
    } catch (error) {
        console.log(error);
    }
}

module.exports = getAllProduct