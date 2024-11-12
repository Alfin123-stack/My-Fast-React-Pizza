/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import DeleteButton from "../../ui/DeleteButton";
import { formatCurrency } from "../../utils/helpers";
import UpdateQuantity from "./UpdateQuantity";
import { getItemQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getItemQuantityById(pizzaId));

  return (
    <li className="py-4 flex justify-between items-center">
      <p>
        {quantity}&times; {name}
      </p>

      <div className="flex gap-x-4 items-center">
        <p className="font-extrabold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
