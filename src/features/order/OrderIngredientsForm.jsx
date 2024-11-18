/* eslint-disable react/prop-types */
import IngredientsItem from "./IngredientsItem";

function OrderIngredients({ ingredients, pizzaId, type }) {
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
            />
          );
        })}
      </ul>
    );

  return (
    <ul className="flex flex-row justify-start gap-4 my-4 flex-wrap border border-stone-300 p-2 rounded-lg">
      {ingredients.map((item) => {
        return <IngredientsItem key={item} name={item} pizzaId={pizzaId} />;
      })}
    </ul>
  );
}

export default OrderIngredients;
