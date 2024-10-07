
export const GetAllProducts = async () =>{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

export const GetProductsBycategory = async(category) =>{
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await response.json();
    return data;
}

export const GetProductById = async(id) =>{
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
}