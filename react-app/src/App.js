import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthModalProvider from "./context/AuthModalProvider";
import CartProvider from "./context/CartProvider";
import NavBar from "./components/NavBar";
import ItemPage from "./components/items/ItemPage";
import HomePage from "./components/HomePage";
import NewItemPage from "./components/items/NewItemPage";
import Results from "./components/search/Results";
import { authenticate } from "./store/session";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <AuthModalProvider>
        <CartProvider>
          <NavBar />
          <Switch>
            <Route path="/items/new">
              <NewItemPage />
            </Route>
            <Route path="/items/:itemId">
              <ItemPage />
            </Route>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/search">
              <Results />
            </Route>
          </Switch>
          <Footer />
        </CartProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );
}

export default App;
