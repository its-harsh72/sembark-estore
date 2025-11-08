/* eslint-env cypress */

describe("Home Page", () => {
  it("should display product cards", () => {
    // Intercept API request to fetch products
    cy.intercept("GET", "https://fakestoreapi.com/products").as("getProducts");

    // Visit the home page and wait for products to load
    cy.visit("/");
    cy.wait("@getProducts");

    // Check that at least one product card is displayed on the screen
    cy.get('[data-testid="product-card"]', { timeout: 10000 })
      .its("length")
      .should("be.gt", 0);
  });
});
