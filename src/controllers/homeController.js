const Contato = require('../models(tratam)/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
    return;
};