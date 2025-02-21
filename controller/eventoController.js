import Evento from "../model/evento.js";

// Listarr
export async function listarEventos(req, res) {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (err) {
        res.status(500).send("Erro ao listar os eventos");
    }
}

// Criar
export async function criarEvento(req, res) {
    try {
        const evento = new Evento(req.body);
        await evento.save();
        res.status(201).json(evento); 
    } catch (err) {
        res.status(400).send("Erro ao criar o evento");
    }
}

// Buscar por ID
export async function buscarEventoPorId(req, res) {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } else {
            res.json(evento);
        }
    } catch (err) {
        res.status(500).send("Erro ao buscar evento");
    }
}

// Atualizar
export async function atualizarEvento(req, res) {
    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } else {
            res.json(evento);
        }
    } catch (err) {
        res.status(400).send("Erro ao atualizar evento");
    }
}

// Deletar
export async function deletarEvento(req, res) {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } else {
            res.json({ message: "Evento deletado com sucesso" });
        }
    } catch (err) {
        res.status(500).send("Erro ao deletar evento");
    }
}
