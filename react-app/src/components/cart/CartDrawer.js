import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import Portal from "../common/Portal";
import { useCart } from "../../context/CartProvider";
import {
  clearCartLocally,
  fetchCartItems,
  selectCartItems,
} from "../../store/cart-items";
import { selectUser } from "../../store/session";

const DrawerRoot = styled.div`
  position: fixed;
  z-index: 1200;
`;

const transitionDuration = 300;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  transition: opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const DrawerContent = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 10px -5px,
    rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform ${transitionDuration}ms cubic-bezier(0, 0, 0.2, 1);

  .inner {
    width: 400px;
  }
`;

const CartDrawer = () => {
  const cart = useCart();
  const cartItems = useSelector(selectCartItems());
  const dispatch = useDispatch();
  const user = useSelector(selectUser());

  useEffect(() => {
    (async () => {
      if (user) {
        await dispatch(fetchCartItems());
      } else {
        await dispatch(clearCartLocally());
      }
    })();
  }, [dispatch, user]);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let visbilityTimeout;
    let mountedTimeout;

    if (cart.visible) {
      setMounted(true);

      // Delay the visibility by a tick so animations happen
      visbilityTimeout = setTimeout(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);

      // Unmount after the visibility has transitioned
      mountedTimeout = setTimeout(() => {
        setMounted(false);
      }, transitionDuration);
    }

    return () => {
      clearTimeout(mountedTimeout);
      clearTimeout(visbilityTimeout);
    };
  }, [cart.visible]);

  const cartItemElements = useMemo(
    () =>
      cartItems.ids.map((id) => {
        const cartItem = cartItems.entities[id];
        return (
          <li key={cartItem.item.id}>
            <div>Name: {cartItem.item.name}</div>
            <div>Quantity: {cartItem.quantity}</div>
            <div>Price: ${cartItem.item.price / 100}</div>
          </li>
        );
      }),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      Object.values(cartItems.entities).reduce(
        (currentTotal, cartItem) =>
          currentTotal + cartItem.item.price * cartItem.quantity,
        0
      ) / 100,
    [cartItems]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <DrawerRoot>
        <Backdrop onClick={cart.hide} style={{ opacity: visible ? 1 : 0 }} />
        <DrawerContent
          style={{ transform: visible ? "translateZ(0)" : "translateX(100%)" }}
        >
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
