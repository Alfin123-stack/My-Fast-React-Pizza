import { useState } from "react";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
        className="mb-10 input"
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
