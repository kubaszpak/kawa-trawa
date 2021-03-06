import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';
import CategoryPage from './components/CategoryPage';
import RegisterConfirmed from './components/RegisterConfirmed';
import ProductPage from './components/ProductPage';
import ProductsPage from './components/ProductsPage';
import OrdersPage from './components/OrdersPage';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import PasswordResetApply from './components/PasswordResetApply';

const cartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart") || "{}");
}

function App() {
  const [cart, setCart] = useState(cartFromLocalStorage)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addProductToCart = (productId) => {
    let newCart = {
      ...cart

    }
    if (productId in cart) {
      newCart[productId] += 1
      console.log(productId, newCart[productId])
    } else {
      newCart[productId] = 1
    }
    setCart(newCart)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/categories' element={<Categories />} /> */}
          <Route path="/PasswordResetApply" element={<PasswordResetApply />} />
          <Route path="/categories/:categoryId" element={<CategoryPage addProductToCart={addProductToCart} />} />
          <Route path="/RegisterConfirmed" element={<RegisterConfirmed />} />
          <Route path="/products/:productId" element={<ProductPage addProductToCart={addProductToCart} />} />
          <Route path="/products/" element={<ProductsPage addProductToCart={addProductToCart} />} />
          <Route path="/orders/" element={<OrdersPage />} />
          <Route path="/cart" element={<Cart cartContent={cart} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
