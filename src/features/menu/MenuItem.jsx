/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 py-2 w-full">
      <img
        className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col w-full">
        <p className="font-semibold">{name}</p>
        <p className="text-stone-500 text-sm italic capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto w-full flex justify-between items-end">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium text-stone-500 uppercase text-sm">
              Sold out
            </p>
          )}

          <Button type="small">Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
