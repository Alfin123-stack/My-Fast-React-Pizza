import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();
  return (
    <div className="p-4 flex flex-col h-full justify-center items-center">
      <h1 className="font-semibold text-xl">Something went wrong 😢</h1>
      <p className="font-semibold text-lg text-red-500">
        {error.data || error.message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
