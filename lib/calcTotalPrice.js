export default function calcTotalPrice(cart) {
  return cart.reduce((tally, item) => {
    // products can be deleted, but the could still be in your cart
    if (!item.product) return tally;

    return tally + item.quantity * item.product.price;
  }, 0);
}
