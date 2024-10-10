// import { useEffect, useState } from "react";
// import { GetAllProducts } from "../apis/ApiServices"

import { useNavigate } from "react-router-dom";
import "./products.css";

const ProductsComponent = ({ products }) => {

    // const [products,setProducts] = useState([]);

    // useEffect(()=>{
    //     getAllProducts();
    // },[]);

    // const getAllProducts = () => {
    //     GetAllProducts().then((res)=>{
    //         console.log(res);
    //         setProducts(res);
    //     })
    //     .catch((error) =>{
    //         console.log(error);
    //     })
    // };

    // // console.log('Products',products);
 
    const navigate = useNavigate();

    const handleClick = (productId) =>{
        navigate(`/product/${productId}`);
       }

    return (
        <div>
            <h1>Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-price">${product.price}</p>
                        <div className="product-detail">
                          <button onClick={()=>handleClick(product.id)}>Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsComponent;