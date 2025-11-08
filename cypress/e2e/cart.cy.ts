/// <reference types="cypress" />
/* eslint-env cypress */

// Test Name: Verifies the full cart flow — from adding an item to removing it again
describe("Cart Flow - Home → Detail → Add → Verify → Remove", () => {
  // Runs before each test case
  beforeEach(() => {
    // Here we watch the API calls so we can wait for them to finish later
    cy.intercept("GET", "https://fakestoreapi.com/products").as("getProducts");
    cy.intercept("GET", "https://fakestoreapi.com/products/*").as("getProduct");
  });

  it("should complete full cart workflow", () => {
    // Step 1: Visit the Home Page and wait for all products to load
    cy.visit("/");
    cy.wait("@getProducts"); // Wait for the product API call to finish
    cy.contains("View Details", { timeout: 10000 }).should("exist");

    // Step 2: Open the first product's detail page
    cy.contains("View Details").first().click();
    cy.url({ timeout: 10000 }).should("include", "/product/"); // Verify that route changed
    cy.wait("@getProduct"); // Wait for product detail API call

    // Step 3: Click on the “Add to Cart” button
    cy.contains("Add to Cart", { timeout: 10000 })
      .should("be.visible")
      .click();

    // Step 4: Check that the cart count in the Navbar increases
    cy.get("[data-testid='cart-count']", { timeout: 8000 }).should(($count) => {
      const count = parseInt($count.text());
      expect(count).to.be.greaterThan(0); // Make sure count > 0 after adding
    });

    // Step 5: Go to the Cart page
    cy.contains("Cart").click();

    // Step 6: Verify that the product exists in the cart
    cy.contains("Your Cart").should("exist");
    cy.get("h2").should("exist"); // Confirms product title is showing
    cy.contains("Total:").should("exist"); // Confirms total value appears

    // Step 7: Remove the product from the cart
    cy.contains("Remove", { timeout: 10000 }).click();

    // Step 8: Check that the cart is now empty and count resets to zero
    cy.contains("Your cart is empty").should("exist");
    cy.get("[data-testid='cart-count']").should("contain", "0");
  });
});
