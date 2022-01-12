import IconButton from "../common/IconButton";
import CartDrawer from "./CartDrawer";
import { useCart } from "../../context/CartProvider";

<<<<<<< HEAD
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
=======
const CartButton = ({ className }) => {
>>>>>>> 0cfbb3c743d47004da7d368ad313f5ca8f5727f3
  const cart = useCart();

  return (
    <>
      <IconButton className={className} onClick={cart.show}>
        <i class="fas fa-shopping-cart" id="cart-icon"></i>
      </IconButton>
      <CartDrawer />
    </>
  );
};

export default CartButton;
