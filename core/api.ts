import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export async function getProductsWithFetch(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


export async function getProductsWithAxios(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
}


export async function getProductByIdWithFetch(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


export async function getProductByIdWithAxios(id: number): Promise<Product> {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
}


export const getProducts = getProductsWithAxios;
export const getProductById = getProductByIdWithAxios;

