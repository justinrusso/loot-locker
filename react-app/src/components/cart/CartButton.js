import styled from "styled-components"

import CartDrawer from "./CartDrawer";
import { useCart } from "../../context/CartProvider";

const StyledCartDiv = styled.div`
  #cart-icon {
    font-size: x-large;
    color: grey;
  }

  #cart-button {
    border: none;
    background-color: transparent;
    border-radius: 30px;
  }

  #cart-button:hover {
    background-color:rgb(235, 235, 235);
  }
`

const CartButton = () => {
  const cart = useCart();

  return (
    <StyledCartDiv>
      <button id="cart-button" onClick={cart.show}>
        <i class="fas fa-shopping-cart" id="cart-icon"></i>
      </button>
      <CartDrawer />
    </StyledCartDiv>
  );
};

export default CartButton;
