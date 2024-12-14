
import supabase from "./supabase";
import short from 'short-uuid';

// const API_URL = "https://react-fast-pizza-api.onrender.com/api";

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

export async function getOrder(orderCode) {
  // const res = await fetch(`${API_URL}/order/${id}`);
  // if (!res.ok) throw Error(`Couldn't find order #${id}`);

  // const { data } = await res.json();
  // return data;

  let { data: orders, error } = await supabase
  .from('orders')
  .select('*')
  .eq('orderCode', orderCode);  

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  if(!orders.length) {
    throw new Error(`Order #${orderCode} not found`);
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

  const { data, error } = await supabase
  .from('orders')
  .insert([
    { ...newOrder, orderCode : short.generate(), pin: short.generate()},
  ])
  .select()

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  
  return data;

}

export async function updateOrder(orderCode, updateObj) {
  // try {
  //   const res = await fetch(`${API_URL}/order/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(updateObj),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!res.ok) throw Error();
  //   // We don't need the data, so we don't return anything
  // } catch {
  //   throw Error("Failed updating your order");
  // }
  const { data, error, status } = await supabase
  .from('orders')
  .update({...updateObj})
  .eq('orderCode', orderCode)
  .select()


  if(status === 400){
    return status
  }

  if (error) {
    console.error(error);
    throw new Error("Orders could not be updated");
  }
  
  return {data, status};
}
