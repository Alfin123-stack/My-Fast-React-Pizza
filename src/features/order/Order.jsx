/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import UpdateOrder from "./UpdateOrder";
import Button from "../../ui/Button";
import CountdownTimer from "../../ui/CountdownTimer";
import OrderItem from "./OrderItem";

import { getOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatCurrency } from "../../utils/helpers";
import usePinValidation from "../../hooks/usePinValidation";

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
  const [isChange, setIsChange] = useState(false);

  // menggunakan useLoaderData untuk mengambil data API sebelum dirender
  const order = useLoaderData();
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    pin,
    orderCode,
  } = order[0];
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // Mengfecth data yang ada di page /menu
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );

  // Custom Hooks : usePinValidation Hooks
  const {
    inputValue,
    timerUpdateOrder,
    setTimerUpdateOrder,
    showPinAlert,
    isValidPin,
  } = usePinValidation(pin, orderCode);

  console.log(isValidPin)
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap justify-between gap-2 items-center">
        <h2 className="text-xl font-bold">Order #{orderCode} status</h2>

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

      <div className="flex justify-between ">
        <Button
          type="small"
          onClick={() => {
            showPinAlert();
            setIsChange(prevState => !prevState);
          }}>
          {isChange && inputValue === pin ? "Cancel" : "Update Order"}
        </Button>

        <CountdownTimer
          orderCode={orderCode}
          initialTime={timerUpdateOrder}
          setTimerUpdateOrder={setTimerUpdateOrder}
        />
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
