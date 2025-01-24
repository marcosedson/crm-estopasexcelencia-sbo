import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);

        if (success) {
            navigate("/producao");
        } else {
            setError("Usuário ou senha inválidos");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-4 text-xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Usuário"
                    className="mb-2 border"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="mb-2 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                    Entrar
                </button>
            </form>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );
};

export default LoginPage;