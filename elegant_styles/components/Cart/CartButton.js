"use client";

import { AddToCart, DeleteCart, UpdateCart } from "@/lib/products";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


// ------------------------Add Cart Button and method
export async function handleAddtoCart(productDetails) {
  const response = await AddToCart(productDetails);
  return response;
}

export function AddCartButton({ productDetail, children }) {
  const router = useRouter();

  let response;
  const handleAddClickEvent = async () => {
    {
      response = await handleAddtoCart(productDetail);

      toast.success(response.responseMessage, {
        onClose: () => router.refresh(),
      });
    }
  };
  return (
    <>
      <button onClick={() => handleAddClickEvent()}>{children}</button>
    </>
  );
}

// ------------------------Update Cart Button and method
export async function handleUpdatetoCart(productDetails) {
  const response = await UpdateCart(productDetails);
  return response;
}

export function UpdateCartButton({ productDetail, children }) {
  const router = useRouter();

  let response;
  const handleUpdateClickEvent = async () => {
    {
      response = await handleUpdatetoCart(productDetail);

      toast.success(response.responseMessage, {
        onClose: () => router.refresh(),
      });
    }
  };

  return (
    <button onClick={() => handleUpdateClickEvent(productDetail)}>
      {children}
    </button>
  );
}

// ------------------------Delete Cart Button and method
export async function handleDeleteCart(id) {
  const response = await DeleteCart(id);
  return response;
}
export function DeleteCartButton({ id, children }) {

  const router = useRouter();

  let response;
  const handleDeleteClickEvent = async () => {
    {
      response = await handleDeleteCart(id);

      toast.success(response.responseMessage, {
        onClose: () => router.refresh(),
      });
    }
  };

  return <button onClick={() => handleDeleteClickEvent(id)}>{children}</button>;
}
