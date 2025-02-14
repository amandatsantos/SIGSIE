const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Adiciona um novo fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fornecedor XYZ"
 *               contato:
 *                 type: string
 *                 example: "contato@fornecedor.com"
 *     responses:
 *       201:
 *         description: Fornecedor adicionado com sucesso
 *       500:
 *         description: Erro ao inserir fornecedor
 */
router.post('/', async (req, res) => {
  const { nome, contato } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO fornecedores (nome, contato) VALUES (?, ?)',
      [nome, contato]
    );
    res.status(201).json({ id: result.insertId, nome, contato });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir fornecedor' });
  }
});

/**
 * @swagger
 * /fornecedores:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *       500:
 *         description: Erro ao buscar fornecedores
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fornecedores');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
});


/**
 * @swagger
 * /fornecedores/{id}:
 *   put:
 *     summary: Atualiza um fornecedor existente
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fornecedor ABC"
 *               contato:
 *                 type: string
 *                 example: "contato@fornecedorabc.com"
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro ao atualizar fornecedor
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, contato } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE fornecedores SET nome = ?, contato = ? WHERE id = ?',
      [nome, contato, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }

    res.json({ message: 'Fornecedor atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
  }
});
module.exports = router;
