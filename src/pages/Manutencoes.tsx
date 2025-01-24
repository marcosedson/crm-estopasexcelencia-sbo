import React, { useState } from "react";
import { Manutencao } from "../types";
import { createManutencao } from "../api";

const maquinas = [
    "Desfibratextil 1 (Grande)",
    "Desfibratextil 2 (Pequena)",
    "Serra 1",
    "Serra 2",
    "Prensa Hidráulica",
    "Exaustor",
];

const ManutencoesPage: React.FC = () => {
    const [formData, setFormData] = useState<Manutencao>({
        data: "",
        maquina: "",
        tipo: "",
        descricaoProblema: "",
        descricaoSolucao: "",
        responsavel: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createManutencao(formData);
            alert("Manutenção registrada com sucesso!");
            // Reseta o formulário após o envio
            setFormData({
                data: "",
                maquina: "",
                tipo: "",
                descricaoProblema: "",
                descricaoSolucao: "",
                responsavel: "",
            });
        } catch (error) {
            alert("Erro ao registrar manutenção!");
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">Registrar Manutenção</h1>

            {/* Formulário */}
            <form onSubmit={handleSubmit}>
                {/* Data */}
                <div className="mb-3">
                    <label htmlFor="data" className="form-label">
                        Data
                    </label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        className="form-control"
                        value={formData.data}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Máquina */}
                <div className="mb-3">
                    <label htmlFor="maquina" className="form-label">
                        Máquina
                    </label>
                    <select
                        id="maquina"
                        name="maquina"
                        className="form-select"
                        value={formData.maquina}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione a Máquina</option>
                        {maquinas.map((maquina) => (
                            <option key={maquina} value={maquina}>
                                {maquina}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tipo de Manutenção */}
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">
                        Tipo de Manutenção
                    </label>
                    <select
                        id="tipo"
                        name="tipo"
                        className="form-select"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione o Tipo</option>
                        <option value="Preventiva">Preventiva</option>
                        <option value="Corretiva">Corretiva</option>
                    </select>
                </div>

                {/* Descrição do Problema */}
                <div className="mb-3">
                    <label htmlFor="descricaoProblema" className="form-label">
                        Descrição do Problema
                    </label>
                    <textarea
                        id="descricaoProblema"
                        name="descricaoProblema"
                        className="form-control"
                        rows={3}
                        value={formData.descricaoProblema}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Descrição da Solução */}
                <div className="mb-3">
                    <label htmlFor="descricaoSolucao" className="form-label">
                        Descrição da Solução
                    </label>
                    <textarea
                        id="descricaoSolucao"
                        name="descricaoSolucao"
                        className="form-control"
                        rows={3}
                        value={formData.descricaoSolucao}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Responsável */}
                <div className="mb-3">
                    <label htmlFor="responsavel" className="form-label">
                        Responsável
                    </label>
                    <input
                        type="text"
                        id="responsavel"
                        name="responsavel"
                        className="form-control"
                        value={formData.responsavel}
                        onChange={handleInputChange}
                        placeholder="Nome do responsável"
                        required
                    />
                </div>

                {/* Botão de envio */}
                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default ManutencoesPage;