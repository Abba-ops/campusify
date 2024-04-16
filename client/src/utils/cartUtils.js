export const numberWithCommas = (number) => {
  return number?.toLocaleString("en-US", { style: "decimal" });
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // calculate delivery charges (1.5% of total items price, minimum 200 NGN)
  state.deliveryPrice = Math.max(200, 0.015 * state.itemsPrice);

  // calculate tax price (7.5% tax)
  state.taxPrice = Number(0.075 * state.itemsPrice);
  
  // calculate the total price for the items including delivery and tax
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.deliveryPrice) +
    Number(state.taxPrice);

  // update cart in local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
