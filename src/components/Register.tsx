import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "./Input";
import { Button } from "./Button";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(`Registration failed: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <Input type="text" value={name} onChange={setName} />
        </div>
        <div>
          <label>Email:</label>
          <Input type="email" value={email} onChange={setEmail} />
        </div>
        <div>
          <label>Senha:</label>
          <Input type="password" value={password} onChange={setPassword} />
        </div>
        <Button type="submit">Registrar</Button>
      </form>
      <Link to="/login">Já tem conta? Faça login</Link>
    </div>
  );
};
