import IconButton from "../common/IconButton";
import CartDrawer from "./CartDrawer";
import { useCart } from "../../context/CartProvider";

const CartButton = ({ className }) => {
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
