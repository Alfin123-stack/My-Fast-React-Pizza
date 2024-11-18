/* eslint-disable react/prop-types */
import Button from "../../ui/Button";

function UpdateIngredients({ onAdd, onRemove }) {
  return (
    <div className="space-x-5 w-full">
      <Button type="small" onClick={onAdd}>
        + Ingredients
      </Button>
      <Button type="small" onClick={onRemove}>
        - Ingredients
      </Button>
    </div>
  );
}

export default UpdateIngredients;
