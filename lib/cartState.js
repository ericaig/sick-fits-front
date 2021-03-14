import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // this is our own custom provider! We'll store data (state) and
  // functionality (updaters) in here and anyone can access it via the consumer!

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart's local state

function useCart() {
  // we use a consumer to access the local state
  const all = useContext(LocalStateContext);

  return all;
}

export { CartStateProvider, useCart };
