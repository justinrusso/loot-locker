import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthModalProvider from "./context/AuthModalProvider";
import CartProvider from "./context/CartProvider";
import NavBar from "./components/NavBar";
import ItemPage from "./components/items/ItemPage";
import HomePage from "./components/HomePage";
import NewItemPage from "./components/items/NewItemPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Results from "./components/search/Results";
import { authenticate } from "./store/session";
import Footer from "./components/Footer";
import { getCategories } from "./store/categories";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(getCategories()))
      .then(() => setLoaded(true));
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
            <ProtectedRoute path="/items/new">
              <NewItemPage />
            </ProtectedRoute>
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
