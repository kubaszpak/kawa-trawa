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


function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/categories' element={<Categories />} /> */}
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/RegisterConfirmed" element={<RegisterConfirmed />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/orders/" element={<OrdersPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
