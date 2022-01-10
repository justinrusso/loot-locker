import CartDrawer from "./CartDrawer";
import { useCart } from "../../context/CartProvider";

const CartButton = () => {
  const cart = useCart();

  return (
    <>
      <button onClick={cart.show}>Cart</button>
      <CartDrawer />
    </>
  );
};

export default CartButton;
