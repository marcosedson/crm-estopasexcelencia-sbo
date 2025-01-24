export interface Producao {
    data: string; // Data da produção
    metaProducao: number; // Meta fixa de produção (em kg)
    quantidade: number; // Quantidade total produzida no dia
    observacoes: string; // Observações adicionais do dia
    produtos: {
        id?: number; // ID do produto (opcional, para casar com backend)
        nome: string; // Nome do produto
        quantidadeKg: number; // Quantidade em quilos
        fd10kg: number; // Fardos de 10kg
        fd15kg: number; // Fardos de 15kg
        fd20kg: number; // Fardos de 20kg
        fd30kg: number; // Fardos de 30kg
        fdkilos: number; // Fardos (Kg adicionais, apenas se necessário para certos produtos)
        pacotes150g: number; // Quantidade de pacotes de 150g
        pacotes500g: number; // Quantidade de pacotes de 500g
    }[]; // Lista de produtos
}

export interface Manutencao {
    data: string;
    maquina: string;
    tipo: string;
    descricaoProblema: string;
    descricaoSolucao: string;
    responsavel: string;
}

export interface Checklist {
    data: string;
    maquina: string;
    verificacoes: {
        limpeza: boolean;
        lubrificacao: boolean;
        pecasSoltas: boolean;
    };
    observacoes: string;
}
