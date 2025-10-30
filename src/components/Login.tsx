import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Input } from "./Input";
import { Button } from "./Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert("Login successful!");
    } catch (err) {
      setError(`Login failed: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <Input type="email" value={email} onChange={setEmail} />
        </div>
        <div>
          <label>Password:</label>
          <Input type="password" value={password} onChange={setPassword} />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <a href="/register">Registro</a>
    </div>
  );
};
