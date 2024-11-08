/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const formErrors = useActionData();
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.username);

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-4">
      <h2 className="mt-4 mb-6 text-2xl font-bold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="space-y-6">
        <div className="sm:flex sm:justify-between">
          <label className="font-semibold sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input w-full sm:w-0 sm:grow"
            defaultValue={username}
          />
        </div>

        <div className="sm:flex sm:justify-between">
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

        <div className="sm:flex sm:justify-between">
          <label className="font-semibold sm:basis-40">Address</label>
          <div className="sm:grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus:outline-none focus:ring focus:ring-yellow-300 accent-yellow-400 w-6 h-6"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input name="cart" value={JSON.stringify(cart)} hidden />
          <Button type="large" disabled={isSubmitting}>
            {isSubmitting ? "Place order...." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newOrder = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };

  const errors = {};

  if (!isValidPhone(newOrder.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newOrder);

  return redirect("/order/" + order.id);
}

export default CreateOrder;
