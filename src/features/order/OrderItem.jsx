/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import IngredientsItem from "./IngredientsItem";
import OrderIngredients from "./OrderIngredientsForm";
import OrderIngredientsForm from "./OrderIngredientsForm";

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

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  const [isRemove, setIsRemove] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  return (
    <li className="py-4">
      <div className="flex justify-between items-center">
        <p>
          <span className="text-stone-800 font-bold">{quantity}&times;</span>{" "}
          {name}
        </p>
        <div className="flex gap-4 justify-center items-center">
          <div className="space-x-5 w-full">
            <Button
              type="small"
              onClick={() => {
                setIsAdd(!isAdd);
                setIsRemove(false);
              }}>
              + Add
            </Button>
            <Button
              type="small"
              onClick={() => {
                setIsAdd(false);
                setIsRemove(!isRemove);
              }}>
              - Remove
            </Button>
          </div>

          <p className="text-stone-800 font-bold">
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
      {isRemove && <OrderIngredients type="remove" ingredients={ingredients} />}
      {isAdd && <OrderIngredients type="add" ingredients={pizzaIngredients} />}
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading...." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
