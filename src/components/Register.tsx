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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-white to-yellow-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Registro
        </h2>
        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome" type="text" value={name} onChange={setName} />

          <Input label="Email" type="email" value={email} onChange={setEmail} />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <Button type="submit">Registrar</Button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};
