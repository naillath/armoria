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
        mensagem: "Equipamento atualizado:",
        equipamento: equipamentos[indice] = { id, ...req.body }
    });
});

app.listen(PORT, () => {
    console.log(`Arsenal Real API está rodando na porta ${PORT}.`);
});