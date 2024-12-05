import { useDispatch } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  deleteAddIngredient,
  deleteRemoveIngredient,
} from "../cart/cartSlice";

/* eslint-disable react/prop-types */
function IngredientsItem({ name, pizzaId, type, addIngredients, removeIngredients }) {
  const dispatch = useDispatch();

  const addIngredientIsChecked = addIngredients?.find( ingredientName => ingredientName === name)
  const removeIngredientIsChecked = removeIngredients?.find( ingredientName => ingredientName === name)

  if (type === "remove")
    return (
      <li className="space-x-2">
        <input
        checked={removeIngredientIsChecked}
          type="checkbox"
          id={name}
          name="ingredients"
          value={name}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(removeIngredient(pizzaId, name));
            } else {
              dispatch(deleteRemoveIngredient(pizzaId, name));
            }
          }}
          className="focus:outline-none focus:ring focus:ring-yellow-300 accent-yellow-400 w-4 h-4"
        />
        <label htmlFor={name} className="capitalize">
          {name}
        </label>
      </li>
    );

  return (
    <li className="space-x-2">
      <input
      checked={addIngredientIsChecked}
        type="checkbox"
        id={name}
        name="ingredients"
        value={name}
        onChange={(e) => {
          if (e.target.checked) {
            dispatch(addIngredient(pizzaId, name));
          } else {
            dispatch(deleteAddIngredient(pizzaId, name));
          }
        }}
        className="focus:outline-none focus:ring focus:ring-yellow-300 accent-yellow-400 w-4 h-4"
      />
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
    </li>
  );
}

export default IngredientsItem;
