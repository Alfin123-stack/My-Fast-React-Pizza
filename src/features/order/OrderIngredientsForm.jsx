/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import IngredientsItem from "./IngredientsItem";

function OrderIngredients({ ingredients, pizzaId, type }) {

  const getAddIngredients = useSelector(state => state.cart.cart.find(item => item.pizzaId === pizzaId))?.addIngredients
  const getRemoveIngredients = useSelector(state => state.cart.cart.find(item => item.pizzaId === pizzaId))?.removeIngredients

  if (type === "remove")
    return (
      <ul className="flex flex-row justify-start gap-4 my-4 flex-wrap border border-stone-300 p-2 rounded-lg">
        {ingredients.map((item) => {
          return (
            <IngredientsItem
              key={item}
              type={type}
              name={item}
              pizzaId={pizzaId}
              removeIngredients={getRemoveIngredients}
            />
          );
        })}
      </ul>
    );

  return (
    <ul className="flex flex-row justify-start gap-4 my-4 flex-wrap border border-stone-300 p-2 rounded-lg">
      {ingredients.map((item) => {
        return <IngredientsItem key={item} name={item} pizzaId={pizzaId} addIngredients={getAddIngredients} />;
      })}
    </ul>
  );
}

export default OrderIngredients;
