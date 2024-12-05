import { useSelector } from "react-redux";
import supabase from "./supabase";
import { getTotalCartPrice } from "../features/cart/cartSlice";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  // const res = await fetch(`${API_URL}/menu`);  

  // // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  // if (!res.ok) throw Error("Failed getting menu");

  // const { data } = await res.json();
  // return data;

  
  const { data: menu, error } = await supabase
  .from('menu')
  .select('*')
  if (error) {
    console.error(error);
    throw new Error("Menu could not be loaded");
  }
  return menu;

}

export async function getOrder(id) {
  // const res = await fetch(`${API_URL}/order/${id}`);
  // if (!res.ok) throw Error(`Couldn't find order #${id}`);

  // const { data } = await res.json();
  // return data;

  let { data: orders, error } = await supabase
  .from('orders')
  .select('*')
  .eq('id', id);  

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  return orders;
}

export async function createOrder(newOrder) {
  // try {
  //   const res = await fetch(`${API_URL}/order`, {
  //     method: "POST",
  //     body: JSON.stringify(newOrder),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!res.ok) throw Error();
  //   const { data } = await res.json();
  //   return data;
  // } catch {
  //   throw Error("Failed creating your order");
  // }
  console.log(newOrder)

  const { data, error } = await supabase
  .from('orders')
  .insert([
    { ...newOrder},
  ])
  .select()

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  
  return data;

}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch {
    throw Error("Failed updating your order");
  }
}
