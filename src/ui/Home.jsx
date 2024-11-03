import CreateUser from "../features/users/CreateUser";

function Home() {
  return (
    <div className="text-xl text-stone-600 text-center my-10 sm:text-3xl">
      <h1 className="font-semibold mb-10">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
