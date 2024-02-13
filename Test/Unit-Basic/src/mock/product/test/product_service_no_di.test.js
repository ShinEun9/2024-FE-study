const ProductService = require("../product_service_no_di");
const ProductClient = require("../product_client");

jest.mock("../product_client");

describe("Product Service No Dependancy Injection Test - Mock", () => {
  const fetchItems = jest.fn(async () => [
    { item: "Milk", available: true },
    { item: "Banana", available: false },
  ]);
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });

  let productService;
  beforeEach(() => {
    productService = new ProductService();
    fetchItems.mockClear();
    ProductClient.mockClear();
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();

    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: "Milk", available: true }]);
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
