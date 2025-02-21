const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};

export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const uniqueVendors = new Set();

  state.cartItems = state.cartItems.map((item) => {
    const vendorId = item.vendor?._id ? item.vendor._id : item.vendor;

    uniqueVendors.add(vendorId);

    return {
      ...item,
      vendor: vendorId,
    };
  });

  state.deliveryPrice = uniqueVendors.size * 200;

  state.taxPrice = Number(0.075 * state.itemsPrice);

  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.deliveryPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
