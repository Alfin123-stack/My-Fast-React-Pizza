/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center justify-center">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
        +
      </Button>
      <span className=" font-extrabold text-xs ">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
        -
      </Button>
    </div>
  );
}

export default UpdateQuantity;
