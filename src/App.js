import './App.css';
import { Routes,Route } from 'react-router-dom';
import ProductsComponent from './components/products';
import Categories from './components/Categories';
import Navbar from './components/navbar';
import { useEffect, useState } from "react";

import { GetAllProducts } from './apis/ApiServices';
import Product from './components/product';

function App() {

  const [products,setProducts] = useState([]);
  const [ categoryList,setCategoryList ] = useState([]);

  useEffect(()=>{
    getAllProducts();
 },[]);
  
 useEffect(()=>{
  extractUniqueCategories(products)
 },[products]);

const getAllProducts = () => {
    GetAllProducts().then((res)=>{
        console.log(res);
        setProducts(res);
    })
    .catch((error) =>{
        console.log(error);
    })
 };
  
 const extractUniqueCategories = (products) => {
  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
  setCategoryList(uniqueCategories);
};

  return (
    <div>
    <Navbar categoryList={ categoryList }/>
      <Routes>
        <Route path="/" element={ <ProductsComponent products={products}/>} />
        <Route path="/category/:category" element={<Categories />} />
        <Route path="/product/:id" element={<Product />} />
       </Routes>
    </div>
  );
}

export default App;
