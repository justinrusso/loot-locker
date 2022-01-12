import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import Button from "../common/Button";
import CartListItem from "./CartListItem";
import IconButton from "../common/IconButton";
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
  width: 100%;

  @media (min-width: 600px) {
    width: auto;
  }

  .inner {
    width: 100%;
    padding: 56px 44px 36px 44px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    position: relative;

    @media (min-width: 600px) {
      width: 500px;
    }
  }

  .close-button-wrapper {
    position: absolute;
    font-size: 18px;
    top: 12px;
    right: 12px;
  }

  h2 {
    text-align: center;
    margin-bottom: 0.35em;
  }

  .divider {
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.divider};
  }

  ul {
    list-style-type: none;
    overflow-y: auto;
  }

  .subtotal {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
  }

  ${Button}.checkout {
    width: 100%;
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
          <CartListItem
            key={cartItem.item.id}
            imgSrc={cartItem.item.image}
            itemId={cartItem.item.id}
            name={cartItem.item.name}
            price={cartItem.item.price / 100}
            quantity={cartItem.quantity}
          />
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

  const totalItems = useMemo(
    () =>
      Object.values(cartItems.entities).reduce(
        (currentTotal, cartItem) => currentTotal + cartItem.quantity,
        0
      ),
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
            <div className="close-button-wrapper">
              <IconButton onClick={() => cart.hide()}>
                <i class="fas fa-times" />
              </IconButton>
            </div>
            <div>
              <h2>Your Cart ({totalItems})</h2>
              <div className="divider" />
              <ul>{cartItemElements}</ul>
            </div>
            <div>
              <h3 className="subtotal">
                Subtotal<span>${subtotal}</span>
              </h3>
              <Button className="checkout">Checkout</Button>
            </div>
          </div>
        </DrawerContent>
      </DrawerRoot>
    </Portal>
  );
};

export default CartDrawer;
