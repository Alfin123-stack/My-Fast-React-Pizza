import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(updateName(username));

    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-10 input w-80"
      />

      {username !== "" && (
        <div>
          <Button type="large">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
