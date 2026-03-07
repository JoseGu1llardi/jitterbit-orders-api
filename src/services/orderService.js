const orderRepository = require("../repositories/orderRepository");

/**
 * Maps to incoming request body (Portuguese fields) to the database schema (English fields).
 *
 * Input:  { numeroPedido, valorTotal, dataCriacao, items: [{ idItem, quantidadeItem, valorItem }] }
 * Output: { orderId, value, creationDate, items: [{ productId, quantity, price }] }
 */
const mapRequestToDatabase = (body) => {
  const mapped = {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
  };

  // Only map items if they are present or non-empty
  if (body.items && body.items.length > 0) {
    mapped.items = body.items.map((item) => ({
      productId: parseInt(item.idItem),
      quantity: parseInt(item.quantidadeItem),
      price: parseFloat(item.valorItem),
    }));
  }
  return mapped;
};

const createOrder = async (body) => {
  const mappedOrder = mapRequestToDatabase(body);
  return await orderRepository.create(mappedOrder);
};

const getOrderById = async (id) => {
  return await orderRepository.findById(id);
};

const getAllOrders = async () => {
  return await orderRepository.findAll();
};

const updateOrder = async (id, body) => {
  const mappedOrder = mapRequestToDatabase(body);
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
