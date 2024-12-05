/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import DeleteButton from "../../ui/DeleteButton";
import { formatCurrency } from "../../utils/helpers";
import UpdateQuantity from "./UpdateQuantity";
import { getItemQuantityById } from "./cartSlice";
import UpdateIngredients from "./UpdateIngredients";
import OrderIngredients from "../order/OrderIngredientsForm";
import { useState } from "react";

const pizzaIngredients = [
  // Base Ingredients
  "Pizza Dough",
  "Marinara Sauce",
  "BBQ Sauce",
  "Pesto Sauce",
  "White Sauce",

  // Cheeses
  "Mozzarella",
  "Cheddar",
  "Parmesan",
  "Gorgonzola",
  "Ricotta",
  "Feta",
];

function CartItem({ item, ingredients }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const [isRemove, setIsRemove] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  function handleAdd() {
    setIsAdd(!isAdd);
    setIsRemove(false);
  }

  function handleRemove() {
    setIsAdd(false);
    setIsRemove(!isRemove);
  }

  const currentQuantity = useSelector(getItemQuantityById(pizzaId));

  

  return (
    <li className="py-4 ">
      <div className="flex justify-between items-center mb-5">
        <p>
          {quantity}&times; {name}
        </p>

        <div className="flex gap-x-4 items-center">
          <p className="font-extrabold">{formatCurrency(totalPrice)}</p>
          <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
          <DeleteButton pizzaId={pizzaId} />
        </div>
      </div>
      <UpdateIngredients onAdd={handleAdd} onRemove={handleRemove}  />
      {isRemove && (
        <OrderIngredients
          type="remove"
          pizzaId={pizzaId}
          ingredients={ingredients}
        />
      )}
      {isAdd && (
        <OrderIngredients pizzaId={pizzaId} ingredients={pizzaIngredients}/>
      )}
    </li>
  );
}

export default CartItem;
