/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getItemQuantityById } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  function handleCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
      addIngredients: [],
      removeIngredients: [],
    };

    dispatch(addItem(newItem));
  }

  const itemQuantity = useSelector(getItemQuantityById(id));
  const isInCart = itemQuantity > 0;

  const currentQuantity = useSelector(getItemQuantityById(id));

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

          {isInCart && (
            <div className="flex gap-2">
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteButton pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
