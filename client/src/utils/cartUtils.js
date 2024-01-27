export const numberWithCommas = (number) => {
  return number?.toLocaleString("en-US", { style: "decimal" });
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // calculate shipping charges (if order is over $100, then free; otherwise, $10 shipping charges)
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // calculate tax price (15% tax)
  state.taxPrice = Number(0.15 * state.itemsPrice);

  // calculate the total price for the items
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  // update cart in local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
