const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const create = async (orderData) => {
  return await prisma.order.create({
    data: {
      orderId: orderData.orderId,
      value: orderData.value,
      creationDate: orderData.creationDate,
      // Prisma's nested create - inserts all items linked to this order in one transaction
      items: {
        create: orderData.items,
      },
    },
    include: { items: true }, // Include items in the returned order object
  });
};

const findById = async (id) => {
  return await prisma.order.findUnique({
    where: { orderId: id },
    include: { items: true },
  });
};

const findAll = async () => {
  return await prisma.order.findMany({
    include: { items: true },
  });
};

const update = async (id, orderData) => {
  // Strategy: full replacement of items only if the items are provided in the request.
  // If no items are sent, only order-level fields are updated.
  return await prisma.order.update({
    where: { orderId: id },
    data: {
      value: orderData.value,
      creationDate: orderData.creationDate,
      ...(orderData.items && {
        // Delete existing items and create new ones - ensures complete replacement
        items: {
          deleteMany: {},
          create: orderData.items, // Creates new items from the request
        },
      }),
    },
    include: { items: true },
  });
};

const deleteOrder = async (id) => {
  // Items must be deleted first due to foreign key constraints
  await prisma.item.deleteMany({
    where: { orderId: id },
  });
  return await prisma.order.delete({
    where: { orderId: id },
  });
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  delete: deleteOrder,
};
