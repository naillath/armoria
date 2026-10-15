const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const equipamentos = [];

app.get("/", (req, res) => {
    res.status(200).send("Arsenal Real API está online.");
});

app.get("/equipamentos", (req, res) => {
    res.status(200).json({
        mensagem: "Lista de equipamentos registrados:",
        equipamentos: equipamentos
    });
});

app.get("/equipamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const equipamentoEncontrado = equipamentos.find((equipamento) => equipamento.id === id);

    if (!equipamentoEncontrado) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado."
        });
    } else {
        res.status(200).send(equipamentoEncontrado);
    }
});

app.post("/equipamentos", (req, res) => {
    const dadosEquipamento = req.body;
    const id = equipamentos.length + 1;
    const novoEquipamento = { id, ...dadosEquipamento };
    equipamentos.push(novoEquipamento);
    res.status(201).json({
        mensagem: "Equipamento registrado:",
        equipamento: novoEquipamento
    });
});

app.put("/equipamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = equipamentos.findIndex(equipamento => equipamento.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado."
        });
    }

    if (!req.body.nome) {
        return res.status(400).json({
            mensagem: "Nome do equipamento é obrigatório."
        });
    }

    if (!req.body.tipo) {
        return res.status(400).json({
            mensagem: "Tipo do equipamento é obrigatório."
        });
    }

    if (!req.body.raridade) {
        return res.status(400).json({
            mensagem: "Raridade do equipamento é obrigatório."
        });
    }

    if (req.body.dano === undefined) {
        return res.status(400).json({
            mensagem: "Dano do equipamento é obrigatório."
        });
    }

    if (req.body.nivel === undefined) {
        return res.status(400).json({
            mensagem: "Nível do equipamento é obrigatório."
        });
    }

    res.status(200).json({
        mensagem: "Equipamento atualizado com sucesso:",
        equipamento: equipamentos[indice] = { id, ...req.body }
    });
});

app.patch("/equipamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = equipamentos.findIndex(equipamento => equipamento.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado."
        });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            mensagem: "Informe ao menos um campo para atualizar o equipamento."
        });
    }
    
    if (req.body.nome !== undefined) {
        equipamentos[indice].nome = req.body.nome;
    }

    if (req.body.tipo !== undefined) {
        equipamentos[indice].tipo = req.body.tipo;
    }

    if (req.body.raridade !== undefined) {
        equipamentos[indice].raridade = req.body.raridade;
    } 

    if (req.body.dano !== undefined) {
        equipamentos[indice].dano = req.body.dano;
    }

    if (req.body.nivel !== undefined) {
        equipamentos[indice].nivel = req.body.nivel;
    }

    res.status(200).json({
        mensagem: "Equipamento atualizado com sucesso:",
        equipamento: equipamentos[indice]
    });
});

app.delete("/equipamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = equipamentos.findIndex(equipamento => equipamento.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado."
        });
    }

    const equipamento = equipamentos[indice];

    equipamentos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Equipamento deletado com sucesso:",
        equipamento: equipamento
    });
})

app.listen(PORT, () => {
    console.log(`Arsenal Real API está rodando na porta ${PORT}.`);
});