import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/users/Username";
function Header() {
  return (
    <header className="bg-yellow-400 text-xl text-white p-3 uppercase border-b-1 border-stone-400 flex items-center justify-between">
      <Link to="/" className="tracking-widest text-stone-800">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
