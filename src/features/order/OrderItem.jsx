/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex justify-between items-center">
        <p>
          <span className="text-stone-800 font-bold">{quantity}&times;</span>{" "}
          {name}
        </p>
        <p className="text-stone-800 font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
