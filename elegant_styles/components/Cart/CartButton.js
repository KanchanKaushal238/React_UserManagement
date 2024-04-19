"use client";

import { AddToCart, DeleteCart, UpdateCart } from "@/lib/products";

export async function handleAddtoCart(productDetails) {
  const response = await AddToCart(productDetails);
  window.location.reload();
}
export function AddCartButton({ productDetail, children }) {
  return (
    <button onClick={() => handleAddtoCart(productDetail)}>{children}</button>
  );
}
export async function handleUpdatetoCart(productDetails) {
  const response = await UpdateCart(productDetails);
  window.location.reload();
}

export function UpdateCartButton({ productDetail, children }) {
  return (
    <button onClick={() => handleUpdatetoCart(productDetail)}>
      {children}
    </button>
  );
}
export async function handleDeleteCart(id) {
  const response = await DeleteCart(id);
  window.location.reload();
}
export function DeleteCartButton({ id, children }) {
  return <button onClick={() => handleDeleteCart(id)}>{children}</button>;
}
