import { useEffect, useState } from "react";
import { GetProductById } from "../apis/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id);
    }, [id]);

    const getProductById = (id) => {
        GetProductById(id).then((res) => {
            console.log(res);
            setProduct(res);
        }).catch((err) => {
            console.log("error", err);
        })
    }

    const handleback = () => {
        navigate(-1);
    }

    console.log("product", product);

    return (
        <div className="product-container">
            <div className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <button onClick={handleback}>Back</button>
            </div>
        </div>
    );
}

export default Product;