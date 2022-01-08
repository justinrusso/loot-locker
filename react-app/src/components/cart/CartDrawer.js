import styled from "styled-components";

import Portal from "../common/Portal";
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

const CartDrawer = () => {
  const cart = useCart();

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
            <ul></ul>
            <div>Subtotal: $0</div>
            <button>Checkout</button>
          </div>
        </DrawerContent>
      </DrawerRoot>
    </Portal>
  );
};

export default CartDrawer;
