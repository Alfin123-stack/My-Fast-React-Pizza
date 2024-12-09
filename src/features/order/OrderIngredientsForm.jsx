/* eslint-disable react/prop-types */
import IngredientsItem from "./IngredientsItem";

function OrderIngredients({ ingredients, pizzaId, type,item, disabled }) {
  const getAddIngredients = item.addIngredients
  const getRemoveIngredients = item.removeIngredients

  console.log(getAddIngredients)

  if (type === "remove")
    return (
      <ul className="flex flex-row justify-start gap-4 my-4 flex-wrap border border-stone-300 p-2 rounded-lg">
        {ingredients.map((item) => {
          return (
            <IngredientsItem
            disabled={disabled}
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
        return (
          <IngredientsItem
          disabled={disabled}
            key={item}
            name={item}
            pizzaId={pizzaId}
            addIngredients={getAddIngredients}
          />
        );
      })}
    </ul>
  );
}

export default OrderIngredients;
