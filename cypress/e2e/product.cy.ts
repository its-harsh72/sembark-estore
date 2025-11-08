/* eslint-env cypress */

describe("Product Detail Page", () => {
  beforeEach(() => {
    // Intercept API call for product details and visit the page
    cy.intercept("GET", "https://fakestoreapi.com/products/*").as("getProduct");
    cy.visit("/product/1");
    cy.wait("@getProduct"); // Wait until product data is loaded
  });

  it("should display product details", () => {
    // Check that key product elements are visible on the page
    cy.get("img").should("be.visible");
    cy.get("h1, h2").should("exist");
    cy.contains("Add to Cart").should("be.visible");
  });

  it("should add product to cart and show updated count", () => {
    // Add item to cart and verify the cart count updates
    cy.contains("Add to Cart").click();
    cy.get("[data-testid='cart-count']", { timeout: 8000 })
      .should("contain", "1");
  });

  it("should navigate to cart when cart link is clicked", () => {
    // Click on the cart link and confirm the page changes to the cart view
    cy.get("a[href='/cart']").click();
    cy.url().should("include", "/cart");
  });
});
