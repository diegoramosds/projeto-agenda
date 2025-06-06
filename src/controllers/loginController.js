const Login = require("../models/loginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("login-logado");
  return res.render("login");
};

exports.register = async function (req, res) {
  try {
    req.body.email = req.body.email.toLowerCase();

    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }
    req.flash("success", "Seu usuario foi criado com sucesso.");
    req.session.save(function () {
      return res.redirect("/login/index");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.login = async function (req, res) {
  try {
    req.body.email = req.body.email.toLowerCase();

    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", "Você entrou no sistema.");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/login/index");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
exports.logout = function (req, res) {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
