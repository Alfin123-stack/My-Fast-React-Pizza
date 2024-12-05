/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCartItems, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../users/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCartItems);

  const formErrors = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error,
  } = useSelector((state) => state.user);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const orderTotal = totalCartPrice + priority;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-4">
      <h2 className="mt-4 mb-6 text-2xl font-bold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="space-y-6">
        <div className="sm:flex sm:justify-between items-center">
          <label className="font-semibold sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input w-full sm:w-0 sm:grow"
            defaultValue={username}
          />
        </div>

        <div className="sm:flex sm:justify-between items-center">
          <label className="font-semibold sm:basis-40">Phone number</label>
          <div className="sm:grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-xs font-semibold py-2 px-4 text-red-600 bg-red-200 mt-4 rounded-lg">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="sm:flex sm:justify-between items-center relative">
          <label className="font-semibold sm:basis-40">Address</label>
          <div className="sm:grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              required
              className="input w-full"
              disabled={addressStatus === "loading"}
            />
            {error && (
              <p className="text-xs font-semibold py-2 px-4 text-red-600 bg-red-200 mt-4 rounded-lg">
                {error}
              </p>
            )}
          </div>
          <span className="absolute top-[1.7rem] right-1 sm:top-2 sm:right-2">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}>
              Get Location
            </Button>
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            className="focus:outline-none focus:ring focus:ring-yellow-300 accent-yellow-400 w-6 h-6"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input name="cart" value={JSON.stringify(cart)} hidden />
          <input name="position" value={position} hidden />
          <Button type="large" disabled={isSubmitting}>
            {isSubmitting
              ? "Place order...."
              : `Order order now on ${formatCurrency(orderTotal)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const orderPrice =  JSON.parse(data.cart).reduce((num, item) => num + item.totalPrice, 0)

  const newOrder = {
    ...data,
    orderPrice,
    priorityPrice : data.priority === 'true' ? orderPrice * 0.2 : 0, 
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  const errors = {};

  if (!isValidPhone(newOrder.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newOrder);

  store.dispatch(clearItem());

  return redirect("/order/" + order[0].id);
}

export default CreateOrder;
