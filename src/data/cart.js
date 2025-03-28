const CART_KEY = 'cart';

export function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCartItems(cartItems) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

export function addToCart(product) {
  let cartItems = getCartItems();
  const index = cartItems.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems[index].soLuong++;
  } else {
    cartItems.push({ ...product, soLuong: 1 });
  }
  saveCartItems(cartItems);
}

export function removeFromCart(productId) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCartItems(cartItems);
}

export function updateQuantity(productId, quantity) {
  let cartItems = getCartItems();
  const index = cartItems.findIndex(item => item.id === productId);
  if (index !== -1 && quantity > 0) {
    cartItems[index].soLuong = quantity;
  }
  saveCartItems(cartItems);
}
