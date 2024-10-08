import { useEffect, useState } from "react";
import { GetProductsBycategory } from "../apis/ApiServices";
import { useParams,useNavigate } from "react-router-dom";
import "./categories.css";

const Categories = () => {
   
    const { category } = useParams();
    const [ categoryNameList ,setCategoryNameList ] = useState([]);
    const navigate = useNavigate(); 

    const [ isFiltered , setIsFiltered ] = useState(false);
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ minPrice, setMinPrice ] = useState('');
    const [ maxPrice, setMaxPrice ] = useState('');

    useEffect(()=>{
        getProductsCategory(category);
        resetFilters();
    },[category]);

    const getProductsCategory =(category) =>{
        GetProductsBycategory(category)
        .then((res)=>{
            console.log(res);
            setCategoryNameList(res);
            })
        .catch((error)=>{
            console.log("Error at fetching with category",error);
        })
    }

    const resetFilters = () => {
        setIsFiltered(false);
        setFilteredProducts([]);
        setMinPrice('');
        setMaxPrice('');
    };

    const filterProducts = () => {
        const filtered = categoryNameList.filter(product => product.price >= minPrice && product.price <= maxPrice);
        console.log("Filtered by minprice and maxprice",filtered);
        const filteredSort = filtered.sort((a,b)=>a.price - b.price);
        setFilteredProducts(filteredSort);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value); 
    };
 
    const handleFilterSubmit = (e) => {
        e.preventDefault();

        const min = Number(minPrice) || 0;
        const max = Number(maxPrice) || Infinity;

        if (minPrice === '' && maxPrice === '') {
            setIsFiltered(false);
            setFilteredProducts(categoryNameList); 
        } 
        else if (minPrice !== '' && maxPrice === '') {
            setIsFiltered(true);
            const filtered = categoryNameList.filter(product => product.price >= min);
            const filteredSort = filtered.sort((a,b)=>a.price - b.price);
            setFilteredProducts(filteredSort);
        } 
        else if (maxPrice !== '' && minPrice === '') {
            setIsFiltered(true);
            const filtered = categoryNameList.filter(product => product.price <= max);
            const filteredSort = filtered.sort((a,b)=>a.price - b.price);
            setFilteredProducts(filteredSort);
        } 
        else if (min >= 0 && max >= min) {
            setIsFiltered(true);
            filterProducts();
        }
        else {
            alert("Please enter a valid price range.");
        }
    };


   const handleClick = (productId) =>{
    navigate(`/product/${productId}`);
   }
   
    return (
        <div>
            { categoryNameList.length === 0 ? (
                <h4>NO results found</h4>
            ) : (
                <div >
                    <div className="price-range-container">
                        <h3 class="price-text">Price Range</h3>
                     <form onSubmit={handleFilterSubmit} >
                        <label>Min:
                         <input
                            type="text"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                         />
                        </label>
                        <label>
                            Max:
                         <input
                            type="text"
                            placeholder="Max Price"
                            value={maxPrice === '' ? '' : maxPrice}
                            onChange={handleMaxPriceChange}
                         />
                        </label>
                        <button type="submit">Filter</button>
                      </form>
                    </div>
                    <div className="product-grid">
                        {isFiltered && filteredProducts.length === 0 ? (
                            <p>No products found under this price range.</p>
                        ) : (
                            (isFiltered ? filteredProducts : categoryNameList).map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.image} alt={product.title} className="product-image" />
                                    <h2 className="product-title">{product.title}</h2>
                                    <p className="product-price">${product.price}</p>
                                    <button onClick={() => handleClick(product.id)}>Details</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categories;
