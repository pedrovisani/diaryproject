const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
};

Contato.prototype.register = async function () {
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body)
};

Contato.prototype.valida = function () {
    this.cleanUp();

    if (this.body.email && !validateEmail(this.body.email)) this.errors.push('Email inválido');
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório!');
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um campo precisa ser preenchido: e-mail ou telefone.');
    }
};

Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    };
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        telefone: this.body.telefone,
        email: this.body.email,
    }

};

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscaContatos = async function(id) {
    const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1})
    return contatos;
};

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
};



module.exports = Contato;