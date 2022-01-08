import styled from "styled-components";
import { useMemo } from "react";

import Portal from "../common/Portal";
import { items, cartItems } from "./mock-data";
import { useCart } from "../../context/CartProvider";

const DrawerRoot = styled.div`
  position: fixed;
  z-index: 1200;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

const DrawerContent = styled.div`
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 10px -5px,
    rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;

  .inner {
    width: 400px;
  }
`;

const sortDateCreated = (itemA, itemB) => {
  return new Date(itemB.date) - new Date(itemA.date);
};

const CartDrawer = () => {
  const cart = useCart();

  const cartItemElements = useMemo(
    () =>
      Object.values(cartItems)
        .sort(sortDateCreated)
        .map((cartItem) => (
          <li key={cartItem.item_id}>
            <div>Name: {items[cartItem.item_id].name}</div>
            <div>Quantity: {cartItem.quantity}</div>
            <div>Price: ${items[cartItem.item_id].price / 100}</div>
          </li>
        )),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      Object.values(cartItems).reduce(
        (currentTotal, cartItem) =>
          currentTotal + items[cartItem.item_id].price * cartItem.quantity,
        0
      ) / 100,
    [cartItems]
  );

  if (!cart.visible) {
    return null;
  }

  return (
    <Portal>
      <DrawerRoot>
        <Backdrop onClick={cart.hide} />
        <DrawerContent>
          <div className="inner">
            <h2>Your Cart</h2>
            <ul>{cartItemElements}</ul>
            <div>Subtotal: ${subtotal}</div>
            <button>Checkout</button>
          </div>
        </DrawerContent>
      </DrawerRoot>
    </Portal>
  );
};

export default CartDrawer;
