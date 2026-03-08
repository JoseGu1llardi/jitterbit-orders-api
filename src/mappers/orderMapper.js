/**
 * Maps to incoming request body (Portuguese fields) to the database schema (English fields).
 *
 * Input:  { numeroPedido, valorTotal, dataCriacao, items: [{ idItem, quantidadeItem, valorItem }] }
 * Output: { orderId, value, creationDate, items: [{ productId, quantity, price }] }
 */
const mapRequestToDatabase = (payload) => ({
  orderId: payload.numeroPedido,
  value: payload.valorTotal,
  creationDate: new Date(payload.dataCriacao),

  // Only map items if they are present or non-empty
  ...(payload.items?.length && {
    items: payload.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: Number(item.quantidadeItem),
      price: Number(item.valorItem),
    })),
  }),
});

module.exports = {
  mapRequestToDatabase,
};
