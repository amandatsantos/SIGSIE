const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * Função para calcular o período automaticamente
 * Formato: "YYYY-TX" (exemplo: "2024-T1" para o primeiro trimestre de 2024)
 */
const getPeriodo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Janeiro é 0, então somamos 1
  const trimestre = Math.ceil(month / 3); // Divide os meses em 4 trimestres
  return `${year}-T${trimestre}`;
};

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Adiciona um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "produtoyz"
 *               descricao:
 *                 type: string
 *                 example: "produto1254as"
 *               preco:
 *                 type: number
 *                 example: 1500.99
 *     responses:
 *       201:
 *         description: Produto adicionado com sucesso
 *       500:
 *         description: Erro ao inserir produto
 */
router.post('/', async (req, res) => {
  const { nome, descricao, preco } = req.body;
  const periodo = getPeriodo(); // Obtendo período automaticamente

  try {
    const [result] = await pool.query(
      "INSERT INTO produtos (nome, descricao, preco, periodo) VALUES (?, ?, ?, ?)", 
      [nome, descricao, preco, periodo]
    );
    
    res.status(201).json({ id: result.insertId, nome, descricao, preco, periodo });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       500:
 *         description: Erro ao buscar produtos
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "produto"
 *               descricao:
 *                 type: string
 *                 example: "produto xyz"
 *               preco:
 *                 type: number
 *                 example: 4500.99
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao atualizar produto
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao, preco, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

module.exports = router;
