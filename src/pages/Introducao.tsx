import React from "react";

const Introducao: React.FC = () => {
    return (
        <div>
            <h1>Bem-vindo ao Sistema de Controle de Estopas Excelência</h1>
            <p>Este sistema foi desenvolvido para facilitar o controle de produção, manutenção e checklist das estopas Excelência.</p>

            <h2>O que você pode fazer aqui:</h2>
            <ul>
                <li><strong>Produção:</strong> Gerencie as metas de produção e registre as quantidades fabricadas.</li>
                <li><strong>Manutenções:</strong> Documente e organize as manutenções realizadas nas máquinas.</li>
                <li><strong>Checklist:</strong> Monitore e mantenha suas operações com verificações regulares.</li>
            </ul>
        </div>
    );
};

export default Introducao;