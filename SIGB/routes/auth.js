const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db"); // Certifique-se de que o pool está sendo importado corretamente
const session = require('express-session'); // Importando express-session
const router = express.Router();

// Função para garantir que um usuário default esteja sempre presente no banco de dados
const createDefaultUser = async () => {
  const defaultEmail = "admin@default.com";
  const defaultPassword = "admin123"; // Senha padrão para o usuário
  const defaultRole = "admin"; // Role do usuário

  try {
    // Verificar se o usuário já existe
    const [results] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [defaultEmail]);

    if (results.length === 0) {
      // Criar senha criptografada
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      // Inserir usuário default no banco
      await pool.query(
        "INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)",
        ["Admin", defaultEmail, hashedPassword, defaultRole]
      );
      console.log("Usuário default criado com sucesso!");
    }
  } catch (err) {
    console.log("Erro ao criar usuário default:", err);
  }
};

// Chamar a função para garantir que o usuário default seja criado ao inicializar o servidor
createDefaultUser();

// Configuração do express-session
router.use(session({
  secret: 'segredo', // Chave secreta para assinatura da sessão
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Acessos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *               nivel:
 *                 type: string
 *                 description: Nível do usuário (opcional)
 *                 default: usuario
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso!
 *       400:
 *         description: Usuário já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

// Registro de usuário
router.post("/register", async (req, res) => {
    const { nome, email, senha, nivel } = req.body;
  
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }
  
    try {
      // Verificar se o usuário já existe
      const [results] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  
      if (results.length > 0) {
        return res.status(400).json({ error: "Usuário já cadastrado" });
      }
  
      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);
  
      // Inserir no banco
      await pool.query(
        "INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)",
        [nome, email, hashedPassword, nivel || "usuario"]
      );
  
      res.json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.log("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Acessos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O e-mail do usuário
 *               senha:
 *                 type: string
 *                 description: A senha do usuário
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso!
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro interno do servidor
 */

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  
      if (!user || user.length === 0) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }
  
      // Verifique se a senha está sendo retornada corretamente
      if (!user[0].senha) {
        return res.status(400).json({ message: 'Senha não encontrada no banco de dados' });
      }
  
      const match = await bcrypt.compare(senha, user[0].senha);
  
      if (!match) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }
  
      // Armazenar os dados do usuário na sessão
      req.session.user = { id: user[0].id, nome: user[0].nome, email: user[0].email };
  
      return res.json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  });

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout do usuário
 *     tags: [Acessos]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso!
 *       500:
 *         description: Erro interno do servidor
 */

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao encerrar sessão" });
    }
    res.json({ message: "Logout realizado com sucesso!" });
  });
});

module.exports = router;
