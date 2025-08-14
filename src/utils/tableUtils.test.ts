import { describe, expect, test } from "bun:test";
import type { Product } from "../types/Product";
import { extractUniqueCategories, filterProducts } from "./tableUtils";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone",
    description: "An apple mobile latest model",
    price: 549,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
  },
  {
    id: 2,
    title: "Samsung",
    description: "Samsung's new version",
    price: 1249,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
  },
  {
    id: 3,
    title: "MacBook Pro",
    description: "MacBook Pro new model",
    price: 1749,
    rating: 4.57,
    stock: 83,
    brand: "Apple",
    category: "laptops",
  },
];

describe("filterProducts", () => {
  test("should return all products when no filters are applied", () => {
    const result = filterProducts(mockProducts, "", "");
    expect(result).toEqual(mockProducts);
    expect(result.length).toBe(mockProducts.length);
  });

  test("should filter products by category", () => {
    const result = filterProducts(mockProducts, "smartphones", "");
    expect(result.length).toBe(2);
    expect(result.every((product) => product.category === "smartphones")).toBe(
      true
    );
  });

  test("should filter products by search query in title", () => {
    const result = filterProducts(mockProducts, "", "iphone");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("iPhone");
  });

  test("should filter products by search query in description", () => {
    const result = filterProducts(mockProducts, "", "version");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Samsung");
  });

  test("should filter products by search query in category", () => {
    const result = filterProducts(mockProducts, "", "laptop");
    expect(result.length).toBe(1);
    expect(result[0].category).toBe("laptops");
  });

  test("should filter products by both category and search query", () => {
    const result = filterProducts(mockProducts, "smartphones", "samsung");
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Samsung");
  });

  test("should return empty array when no products match the filters", () => {
    const result = filterProducts(mockProducts, "tablets", "");
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});

describe("extractUniqueCategories", () => {
  test("should extract unique categories from products", () => {
    const categories = extractUniqueCategories(mockProducts);
    expect(categories.length).toBe(2);
    expect(categories).toContain("smartphones");
    expect(categories).toContain("laptops");
  });

  test("should return an empty array for empty products", () => {
    const categories = extractUniqueCategories([]);
    expect(categories).toEqual([]);
    expect(categories.length).toBe(0);
  });

  test("should handle products with duplicate categories", () => {
    const duplicateProducts = [
      ...mockProducts,
      {
        id: 5,
        title: "Another Smartphone",
        description: "Yet another smartphone",
        price: 299,
        rating: 3.9,
        stock: 120,
        brand: "Brand X",
        category: "smartphones",
      },
    ];

    const categories = extractUniqueCategories(duplicateProducts);
    expect(categories.length).toBe(2);
    expect(categories).toContain("smartphones");
  });
});
