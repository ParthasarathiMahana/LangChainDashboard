const OrderModel = require("../models/Order.model");

const getAllOrder = async() => {
    try {
        const orders = await OrderModel.find().populate('productId');
        return orders
    } catch (error) {
        console.log(error);
    }
}

module.exports = getAllOrder