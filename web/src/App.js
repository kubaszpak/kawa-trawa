import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';
import CategoryPage from './components/CategoryPage';
import RegisterConfirmed from './components/RegisterConfirmed';
import ProductsPage from './components/ProductsPage';



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
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
