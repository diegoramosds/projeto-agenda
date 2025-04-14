const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
  if (!req.session.user) return res.render("login");

  const contatos = await Contato.buscaContatos(req.session.user._id);
  res.render("index", { contatos });
};

