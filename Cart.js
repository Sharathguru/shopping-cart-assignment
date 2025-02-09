// const axios = require("axios");

const { default: axios } = require("axios");

class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  async addProduct(productId, quantity = 1) {
    try {

        //i 
      const response = await axios.get(`http://localhost:3001/products/${productId}`);
      const product = response.data;

      let existingItem = this.cart.find(item => item.product.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({ product, quantity });
      }

      console.log(`${quantity} x ${product.title} added to cart.`);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  }
  calculateTotals() {
    let subtotal = this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let tax = Math.ceil(subtotal * 0.125 * 100) / 100;
    let total = subtotal + tax;
    return { subtotal, tax, total };
  }

  displayCart() {
    console.log("\nShopping Cart:");
    this.cart.forEach(item => {
      console.log(`${item.quantity} x ${item.product.title} @ $${item.product.price} each`);
    });

    const totals = this.calculateTotals();
    console.log(`Subtotal: $${totals.subtotal.toFixed(2)}`);
    console.log(`Tax (12.5%): $${totals.tax.toFixed(2)}`);
    console.log(`Total: $${totals.total.toFixed(2)}\n`);
  }
}
(async () => {
  const cart = new ShoppingCart();
  await cart.addProduct("cornflakes", 2);
  await cart.addProduct("weetabix", 1);
  cart.displayCart();
})();
