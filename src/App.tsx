import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Producao from "./pages/Producao";
import Manutencoes from "./pages/Manutencoes";
import Checklist from "./pages/Checklist";
import Introducao from "./pages/Introducao";
import Login from "./pages/Login";

const App: React.FC = () => {
    return (
        // Adicionando o basename '/controle' ao BrowserRouter
        <Router basename="/controle">
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Introducao />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/producao" element={<Producao />} />
                    <Route path="/manutencoes" element={<Manutencoes />} />
                    <Route path="/checklist" element={<Checklist />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;