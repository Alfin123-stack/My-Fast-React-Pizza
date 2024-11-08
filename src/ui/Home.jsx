import { useSelector } from "react-redux";
import CreateUser from "../features/users/CreateUser";
import Button from "./Button";
// import { Navigate } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username);

  // if (!username) return <Navigate to="/menu" />;

  return (
    <div className="text-xl text-stone-600 text-center my-10 sm:text-3xl">
      <h1 className="font-semibold mb-10">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button type="large" to="/menu">
          Continue Ordering...
        </Button>
      )}
    </div>
  );
}

export default Home;
