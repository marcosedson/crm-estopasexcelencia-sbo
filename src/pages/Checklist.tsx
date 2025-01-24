import React, { useState } from "react";

interface Verificacao {
    texto: string;
    status: string;
}

interface Checklist {
    [key: string]: {
        verificacoes: Verificacao[];
    };
}

const ChecklistSegurancaManutencao: React.FC = () => {
    const [formData, setFormData] = useState<{
        data: string;
        responsavel: string;
        observacoes: string;
        checklist: Checklist;
    }>({
        data: "",
        responsavel: "",
        observacoes: "",
        checklist: {
            prensaHidraulica: {
                verificacoes: [
                    { texto: "Inspecionar mangueiras e conexões para possíveis vazamentos", status: "" },
                    { texto: "Conferir as alavancas manuais de operação", status: "" },
                    { texto: "Checar o funcionamento do botão de emergência", status: "" },
                    { texto: "Inspecionar as proteções de segurança da prensa", status: "" },
                    { texto: "Confirmar que a área de trabalho está limpa e organizada", status: "" },
                    { texto: "Testar a operação da prensa em ciclo normal", status: "" },
                ],
            },
            desfibratextilGrande: {
                verificacoes: [
                    { texto: "Inspecionar as lâminas para desgaste ou danos", status: "" },
                    { texto: "Verificar o sistema de exaustão", status: "" },
                    { texto: "Testar o botão de emergência", status: "" },
                    { texto: "Certificar que a área ao redor da máquina está limpa e sem obstruções", status: "" },
                    { texto: "Inspecionar a segurança das proteções e barreiras", status: "" },
                    { texto: "Testar a operação da máquina para verificação de ruídos anormais", status: "" },
                ],
            },
            desfibratextilPequena: {
                verificacoes: [
                    { texto: "Inspecionar as lâminas para desgaste ou danos", status: "" },
                    { texto: "Verificar o sistema de exaustão", status: "" },
                    { texto: "Testar o botão de emergência", status: "" },
                    { texto: "Certificar que a área ao redor da máquina está limpa e sem obstruções", status: "" },
                    { texto: "Inspecionar a segurança das proteções e barreiras", status: "" },
                    { texto: "Testar a operação da máquina para verificação de ruídos anormais", status: "" },
                ],
            },
            serraMesa1: {
                verificacoes: [
                    { texto: "Verificar o estado da lâmina de corte", status: "" },
                    { texto: "Verificar se a correia da polia está em bom estado", status: "" },
                    { texto: "Conferir o funcionamento do motor", status: "" },
                    { texto: "Verificar a proteção de segurança (capa da lâmina)", status: "" },
                    { texto: "Certificar que a área de corte está limpa e livre de obstruções", status: "" },
                    { texto: "Inspecionar os botões de emergência e de parada rápida", status: "" },
                    { texto: "Testar a operação da serra para ruídos anormais", status: "" },
                ],
            },
            serraMesa2: {
                verificacoes: [
                    { texto: "Verificar o estado da lâmina de corte", status: "" },
                    { texto: "Verificar se a correia da polia está em bom estado", status: "" },
                    { texto: "Conferir o funcionamento do motor", status: "" },
                    { texto: "Verificar a proteção de segurança (capa da lâmina)", status: "" },
                    { texto: "Certificar que a área de corte está limpa e livre de obstruções", status: "" },
                    { texto: "Inspecionar os botões de emergência e de parada rápida", status: "" },
                    { texto: "Testar a operação da serra para ruídos anormais", status: "" },
                ],
            },
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        section: string,
        index?: number
    ) => {
        const { value } = e.target;

        if (index !== undefined) {
            const sectionData = formData.checklist[section];
            sectionData.verificacoes[index].status = value;
            setFormData({
                ...formData,
                checklist: {
                    ...formData.checklist,
                    [section]: sectionData,
                },
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);
        alert("Checklist enviado com sucesso!");
    };

    const renderChecklistSection = (title: string, section: string) => (
        <div className="mb-5">
            <h3>{title}</h3>
            <ul className="list-unstyled">
                {formData.checklist[section].verificacoes.map((item, index) => (
                    <li key={index} className="mb-3">
                        <label>{item.texto}</label>
                        <div className="form-check d-flex align-items-center">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id={`${section}-${index}-ok`}
                                name={`${section}-${index}`}
                                value="✔"
                                onChange={(e) => handleInputChange(e, section, index)}
                            />
                            <label htmlFor={`${section}-${index}-ok`} className="me-4">✔</label>

                            <input
                                type="radio"
                                className="form-check-input me-2"
                                id={`${section}-${index}-notok`}
                                name={`${section}-${index}`}
                                value="✘"
                                onChange={(e) => handleInputChange(e, section, index)}
                            />
                            <label htmlFor={`${section}-${index}-notok`}>✘</label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="container mt-4">
            <h1>Checklist de Segurança e Manutenção</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="data" className="form-label">Data</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        className="form-control"
                        value={formData.data}
                        onChange={(e) => handleInputChange(e, "")}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="responsavel" className="form-label">Responsável</label>
                    <input
                        type="text"
                        id="responsavel"
                        name="responsavel"
                        className="form-control"
                        value={formData.responsavel}
                        onChange={(e) => handleInputChange(e, "")}
                        placeholder="Nome do responsável"
                        required
                    />
                </div>

                {renderChecklistSection("Prensa Hidráulica", "prensaHidraulica")}
                {renderChecklistSection("Desfibratextil Grande", "desfibratextilGrande")}
                {renderChecklistSection("Desfibratextil Pequena", "desfibratextilPequena")}
                {renderChecklistSection("Serra de Mesa 1", "serraMesa1")}
                {renderChecklistSection("Serra de Mesa 2", "serraMesa2")}

                <div className="mb-4">
                    <label htmlFor="observacoes" className="form-label">Observações</label>
                    <textarea
                        id="observacoes"
                        name="observacoes"
                        className="form-control"
                        rows={4}
                        value={formData.observacoes}
                        onChange={(e) => handleInputChange(e, "")}
                        placeholder="Insira suas observações aqui"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Enviar Checklist</button>
            </form>
        </div>
    );
};

export default ChecklistSegurancaManutencao;