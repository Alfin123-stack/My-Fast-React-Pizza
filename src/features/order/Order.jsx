/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
} from "../../utils/helpers";
8;
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import UpdateOrder from "./UpdateOrder";
import Button from "../../ui/Button";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();

  const fetcher = useFetcher();

  const [isChange, setIsChange] = useState(false);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );

  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    pin,
    orderCode,
  } = order[0] 
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const [inputValue, setInputValue] = useState('')

  // Show Swal function
  const showSwal = () => {
    withReactContent(Swal)
      .fire({
        title: <p>Insert Your PIN</p>,
        input: 'text',
        inputValue,
        preConfirm: () => {
          // Before confirming, capture the input value
          return Swal.getInput()?.value || '';  // Prevent resetting before submitting
        },
      })
      .then((result) => {
        // If user pressed OK, you can handle the result
        if (result.isConfirmed) {
          setInputValue(result.value);  // Set the value to inputValue if needed
        }
      })
      .finally(() => {
        // Reset inputValue after confirmation or cancellation
        setInputValue('');
      });
  };

  // pin
  const isValidPin = inputValue === pin ? true : false;
  console.log(inputValue,pin)
  console.log(isValidPin)
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap justify-between gap-2 items-center">
        <h2 className="text-xl font-bold">
          Order #{orderCode} status
        </h2>

        <div className="flex gap-2 items-center">
          {priority && (
            <span className="uppercase bg-red-600 text-red-50 py-2 px-4 rounded-full text-xs font-semibold ">
              Priority
            </span>
          )}
          <span className="uppercase bg-green-600 text-green-50 py-2 px-4 rounded-full text-xs font-semibold ">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between bg-stone-200 p-4 rounded-sm">
        <p className="font-semibold">
          {deliveryIn.minutesLeft >= 0
            ? `Only ${deliveryIn.minutesLeft} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="font-semibold">
          (Estimated delivery: {deliveryIn.date.toLocaleString()})
        </p>
      </div>

      <ul className=" divide-y-2 border-t border-b">
        {cart?.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ||
              []
            }
          />
        ))}
      </ul>

      <div className="bg-stone-200 p-4 rounded-sm space-y-4">
        <p className="font-semibold">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-semibold">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-extrabold text-stone-900">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      <UpdateOrder
      isValidPin={isValidPin}
      isChange={isChange}
        order={order[0]}
        priority={priority}
      />

      <Button type="large" onClick={() => {
        showSwal()
        setIsChange(!isChange)
      }}>
        {isChange && inputValue === pin ? "Cancel" : "Update Order"}
      </Button>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
