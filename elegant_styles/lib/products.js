import axios from "axios";
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

export async function GetAllProducts() {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  });

  const responseData = await response.json();

  return responseData;
}

export async function GetDistinctCategories() {
  const products = await GetAllProducts();

  let unique_categories = products
    .map((item) => item.category)
    .filter(
      (value, index, current_value) => current_value.indexOf(value) === index
    );

  return unique_categories;
}

export async function GetAllImages() {
  const products = await GetAllProducts();

  let images = products.map((item) => item.image);

  return images;
}

export async function GetProductsByCategories(category) {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    {
      method: "GET",
    }
  );

  const responseData = await response.json();

  return responseData;
}

export async function GetSingleProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "GET",
  });

  const responseData = await response.json();

  return responseData;
}

export async function GetAllCart() {
  const response = await axios.get("https://localhost:44344/api/cart/GetAllCart",{
    httpsAgent: agent
  });

  const responseData =await response.data;
  return responseData;
}

export async function AddToCart(productDetail) {

const requestBody = {
    ProductId: productDetail.id,
    title: productDetail.title,
    price : parseInt(productDetail.price),
    description: productDetail.description,
    category: productDetail.category
};

console.log('req ', requestBody);
  const response = await fetch("https://localhost:44344/api/cart/AddCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(requestBody),
  });

  return response;
}

export async function UpdateCart(productDetail) {

  const requestBody = {
    id: productDetail.id,
      ProductId: productDetail.productId,
      title: productDetail.title,
      price : parseInt(productDetail.price),
      description: productDetail.description,
      category: productDetail.category
  };
  
  console.log('req ', requestBody);
    const response = await fetch("https://localhost:44344/api/cart/UpdateCart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(requestBody),
    });
  
    return response;
  }

  export async function DeleteCart(id) {
    console.log("delete action")
      const response = await fetch(`https://localhost:44344/api/cart/DeleteCart/${id}`, {
        method: "DELETE"
      });
    
      return response;
    }