import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-black text-white p-3 font-semibold uppercase flex items-center justify-between sm:text-xl">
      <p className="space-x-3 ">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
