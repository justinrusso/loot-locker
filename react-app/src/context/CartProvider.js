import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <CartContext.Provider
      value={{
        visible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
