import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import SearchOrder from "../features/order/SearchOrder";
function AppLayOut() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      <Header />
      <SearchOrder />
      {isLoading && <Loader />}
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayOut;
