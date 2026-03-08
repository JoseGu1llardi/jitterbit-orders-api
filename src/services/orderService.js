const orderRepository = require("../repositories/orderRepository");
const { mapRequestToDatabase } = require("../mappers/orderMapper");

const createOrder = async (payload) => {
  const mappedOrder = mapRequestToDatabase(payload);
  return await orderRepository.create(mappedOrder);
};

const getOrderById = async (id) => {
  return await orderRepository.findById(id);
};

const getAllOrders = async () => {
  return await orderRepository.findAll();
};

const updateOrder = async (id, payload) => {
  const mappedOrder = mapRequestToDatabase(payload);
  return await orderRepository.update(id, mappedOrder);
};

const deleteOrder = async (id) => {
  return await orderRepository.delete(id);
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
