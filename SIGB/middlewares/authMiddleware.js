// authMiddleware.js
const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Não autorizado - Usuário não autenticado" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (req.session.user.nivel !== "admin") {
    return res.status(403).json({ message: "Acesso negado - Permissões insuficientes" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
