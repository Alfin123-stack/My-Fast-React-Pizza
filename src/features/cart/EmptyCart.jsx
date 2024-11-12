import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="p-4 h-full grid grid-rows-[1fr_1fr]">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="text-xl font-semibold text-center">
        Your cart 🛒 is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
