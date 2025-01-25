import { Checklist, Manutencao, Producao } from "./types";

const API_BASE_URL = "http://localhost:8088"; // Corrigido para incluir o protocolo HTTP

export const createProducao = async (producao: Producao) => {
    const response = await fetch(`${API_BASE_URL}/api/producao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producao),
    });
    if (!response.ok) {
        throw new Error(`Erro ao criar produção: ${response.statusText}`);
    }
    return response.json();
};

export const getProducaoMensalAtual = async (): Promise<{ total_kg: number }> => {
    const response = await fetch(`${API_BASE_URL}/api/producao`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Erro ao buscar produção mensal: ${response.statusText}`);
    }

    return await response.json(); // Agora retorna { totalKg: number }
};

export const createManutencao = async (manutencao: Manutencao) => {
    const response = await fetch(`${API_BASE_URL}/api/manutencao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manutencao),
    });
    if (!response.ok) {
        throw new Error(`Erro ao criar manutenção: ${response.statusText}`);
    }
    return response.json();
};

export const createChecklist = async (checklist: Checklist) => {
    const response = await fetch(`${API_BASE_URL}/api/checklist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checklist),
    });
    if (!response.ok) {
        throw new Error(`Erro ao criar checklist: ${response.statusText}`);
    }
    return response.json();
};