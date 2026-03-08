const { mapRequestToDatabase } = require("./orderMapper");

describe("mapRequestToDatabase", () => {
  it("should map Portuguese fields to English fields correctly", () => {
    // Arrange - build the input
    const input = {
      numeroPedido: "v10089015vdb-01",
      valorTotal: 10000,
      dataCriacao: "2023-07-19T12:24:11.529Z",
      items: [{ idItem: "2434", quantidadeItem: 1, valorItem: 1000 }],
    };

    // Act - call the function
    const result = mapRequestToDatabase(input);

    // Assert - check the output
    expect(result.orderId).toBe("v10089015vdb-01");
    expect(result.value).toBe(10000);
    expect(result.items[0].productId).toBe(2434);
    expect(result.items[0].quantity).toBe(1);
    expect(result.creationDate).toBeInstanceOf(Date);
    expect(result.items[0].price).toBe(1000);
  });
});
