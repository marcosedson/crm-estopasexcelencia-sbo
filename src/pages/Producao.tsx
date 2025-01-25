import React, { useState, useEffect } from "react";
import { Producao } from "../types";
import { createProducao, getProducaoMensalAtual } from "../api";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";

const produtosFixos = [
    { id: 1, nome: "Estopa Branca Extra" },
    { id: 2, nome: "Estopa Branca Comum" },
    { id: 3, nome: "Estopa Colorida 1ª" },
    { id: 4, nome: "Estopa Colorida 2ª" },
    { id: 5, nome: "Estopa Colorida Sm" },
    { id: 6, nome: "Estopa Enchimento" },
    { id: 7, nome: "Estopa Costurada Pastelão" },
];

const ProducaoPage: React.FC = () => {
    const [formData, setFormData] = useState<Producao>({
        data: new Date().toISOString().substr(0, 10),
        metaProducao: 180,
        quantidade: 0,
        observacoes: "",
        produtos: produtosFixos.map((produto) => ({
            id:produto.id,
            nome: produto.nome,
            quantidade: 0,
            pacotes150g: 0,
            pacotes500g: 0,
            fd10kg: 0,
            fd20kg: 0,
            fd15kg: 0,
            fd30kg: 0,
            fdkilos: 0, // Apenas para Pastelão
            quantidadeKg: 0, // Novo campo: quantidade de kg produzido
        })),
    });

    const [quantidadeMensalAtual, setQuantidadeMensalAtual] = useState<number>(0);
    const metaMensal = 3600; // Exemplo de meta mensal

    useEffect(() => {
        const buscarProducaoMensal = async () => {
            try {
                const totalMensal = await getProducaoMensalAtual();
                setQuantidadeMensalAtual(totalMensal.total_kg);
            } catch (error) {
                console.error("Erro ao buscar a quantidade mensal:", error);
                setQuantidadeMensalAtual(0);
            }
        };

        buscarProducaoMensal();
    }, []);

    const handleProdutoChange = (index: number, field: string, value: number) => {
        setFormData((prevFormData) => {
            const novosProdutos = [...prevFormData.produtos];
            novosProdutos[index] = {
                ...novosProdutos[index],
                [field]: value,
            };

            // Recalcula a quantidade total de produção
            const novaQuantidade = novosProdutos.reduce(
                (total, produto) => total + produto.quantidadeKg,
                0
            );

            return {
                ...prevFormData,
                produtos: novosProdutos,
                quantidade: novaQuantidade,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verifica se a quantidade total de quilos produzidos é maior que 0
        const totalQuilosProduzidos = formData.produtos.reduce(
            (total, produto) => total + produto.quantidadeKg,
            0
        );

        if (totalQuilosProduzidos <= 0) {
            alert("A quantidade total de quilos produzidos precisa ser maior que 0.");
            return;
        }


        try {
            // Teste chamando a API
            const resultado = await createProducao(formData);
            console.log("Produção registrada com sucesso:", resultado);
            alert("Produção registrada com sucesso!");

            // Resetando formulário
            setFormData({
                data: new Date().toISOString().substr(0, 10),
                metaProducao: 180,
                quantidade: 0,
                observacoes: "",
                produtos: produtosFixos.map((produto) => ({
                    id: produto.id,
                    nome: produto.nome,
                    quantidadeKg: 0,
                    pacotes150g: 0,
                    pacotes500g: 0,
                    fd10kg: 0,
                    fd20kg: 0,
                    fd15kg: 0,
                    fd30kg: 0,
                    fdkilos: 0,
                })),
            });
        } catch (error) {
            console.error("Erro ao registrar produção:", error);
            alert(`Erro ao registrar produção: ${error}`);
        }
    };

    // Calcula o total de pacotes (150g e 500g) processados
    const totalPacotes = formData.produtos.reduce(
        (total, produto) => total + (produto.pacotes150g || 0) + (produto.pacotes500g || 0),
        0
    );

    // Calcula o total de quilos produzidos no dia
    const totalQuilosProduzidos = formData.produtos.reduce(
        (total, produto) => total + produto.quantidadeKg,
        0
    );

    return (
        <div>
            <h1 className="mb-4">Produção do Dia</h1>

            {/* Informações gerais */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <div>
                    <h3 className="text-gray-700">Meta Mínima Mensal</h3>
                    <p className="font-bold text-lg">{metaMensal} kg</p>
                </div>
                <div>
                    <h3 className="text-gray-700">Produção Atual do Mês</h3>
                    {typeof quantidadeMensalAtual === "number" ? (
                        <p className="font-bold text-lg">{quantidadeMensalAtual} kg</p>
                    ) : (
                        <p className="text-red-500">Erro ao carregar os dados</p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Data"
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={() => {
                    }}
                    disabled
                />

                <FormInput
                    label="Meta de Produção Diária (kg)"
                    type="number"
                    name="metaProducao"
                    value={formData.metaProducao}
                    onChange={() => {
                    }}
                    disabled
                />

                <h3>Produção de Produtos</h3>
                {formData.produtos.map((produto, index) => (
                    <div key={produto.nome} className="mb-4 p-4 border rounded">
                        <h4 className="mb-2">{produto.nome}</h4>

                        {/* Campo para "quantidade Kg produzido" */}
                        {produto.nome !== "Estopa Costurada Pastelão" && (
                            <div className="mb-3">
                                <label>Quantidade de Kg Produzido</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={produto.quantidadeKg}
                                    onChange={(e) =>
                                        handleProdutoChange(
                                            index,
                                            "quantidadeKg",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    placeholder="Qtd. em Kg"
                                />
                            </div>
                        )}

                        {/* Campos para "Estopa Costurada Pastelão" */}
                        {produto.nome === "Estopa Costurada Pastelão" ? (
                            <div className="flex items-center space-x-4">
                                <div>
                                    <label>Fardos 10kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd10kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd10kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 10kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Fardos 15kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd15kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd15kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 15kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Fardos 30kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd30kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd30kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 30kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Fardos (Kg)</label>
                                    <input
                                        type="number"
                                        value={produto.fdkilos}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fdkilos", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos (Kg)"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        ) : (
                            // Campos padrão para outros produtos
                            <div className="flex items-center space-x-4">
                                <div>
                                    <label>Fardos 10kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd10kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd10kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 10kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Fardos 20kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd20kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd20kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 20kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Fardos 30kg</label>
                                    <input
                                        type="number"
                                        value={produto.fd30kg}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "fd30kg", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Fardos 30kg"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Pacotes 150g</label>
                                    <input
                                        type="number"
                                        value={produto.pacotes150g}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "pacotes150g", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Pacotes 150g"
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <label>Pacotes 500g</label>
                                    <input
                                        type="number"
                                        value={produto.pacotes500g}
                                        onChange={(e) =>
                                            handleProdutoChange(index, "pacotes500g", parseInt(e.target.value) || 0)
                                        }
                                        placeholder="Pacotes 500g"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Totais calculados */}
                <div className="p-4 mb-4 bg-gray-50 border rounded">
                    <p className="text-lg font-bold">
                        Total de Pacotes Feitos: {totalPacotes}
                    </p>
                    <p className="text-lg font-bold">
                        Total de Quilos Produzidos: {totalQuilosProduzidos} kg
                    </p>
                </div>
                {/* Observações */}
                <FormInput
                    label="Observações"
                    type="text"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={(e) =>
                        setFormData({...formData, observacoes: e.target.value})
                    }
                    placeholder="Observações"
                    isTextArea
                />
                <br />
                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default ProducaoPage;