const express = require('express');
const pool = require('../db');
const router = express.Router();

/**
 * @swagger
 * /materia-prima:
 *   post:
 *     summary: Adiciona uma nova matéria-prima
 *     tags: [Matéria-Prima]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "material"
 *               quantidade:
 *                 type: number
 *                 example: 100
 *               unidade:
 *                 type: string
 *                 example: "kg"
 *     responses:
 *       201:
 *         description: Matéria-prima adicionada com sucesso
 *       500:
 *         description: Erro ao inserir matéria-prima
 */
router.post('/', async (req, res) => {
  const { nome, quantidade, unidade } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO materia_prima (nome, quantidade, unidade) VALUES (?, ?, ?)', [nome, quantidade, unidade]);
    res.status(201).json({ id: result.insertId, nome, quantidade, unidade });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir matéria-prima' });
  }
});

/**
 * @swagger
 * /materia-prima:
 *   get:
 *     summary: Lista todas as matérias-primas
 *     tags: [Matéria-Prima]
 *     responses:
 *       200:
 *         description: Lista de matérias-primas
 *       500:
 *         description: Erro ao buscar matérias-primas
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM materia_prima');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar matérias-primas' });
  }
});


/**
 * @swagger
 * /materia-prima/{id}:
 *   put:
 *     summary: Atualiza uma matéria-prima existente
 *     tags: [Matéria-Prima]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da matéria-prima a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "material"
 *               quantidade:
 *                 type: number
 *                 example: 200
 *               unidade:
 *                 type: string
 *                 example: "kg"
 *     responses:
 *       200:
 *         description: Matéria-prima atualizada com sucesso
 *       404:
 *         description: Matéria-prima não encontrada
 *       500:
 *         description: Erro ao atualizar matéria-prima
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, unidade } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE materia_prima SET nome = ?, quantidade = ?, unidade = ? WHERE id = ?',
      [nome, quantidade, unidade, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Matéria-prima não encontrada' });
    }

    res.json({ message: 'Matéria-prima atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar matéria-prima' });
  }
});

/**
 * @swagger
 * /materia-prima/{id}/consumo:
 *   post:
 *     summary: Registra o consumo de uma matéria-prima em um período
 *     tags: [Matéria-Prima]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da matéria-prima
 *       - in: query
 *         name: periodo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Consumo registrado com sucesso
 *       400:
 *         description: Parâmetros ausentes
 *       500:
 *         description: Erro ao registrar consumo
 */
router.post('/:id/consumo', async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;
  const { periodo } = req.query; // O período pode ser passado como parâmetro na URL

  if (!periodo || !quantidade) {
    return res.status(400).json({ error: "Os parâmetros 'periodo' e 'quantidade' são obrigatórios" });
  }

  try {
    await pool.query(
      'INSERT INTO consumo_materia_prima (materia_prima_id, quantidade, periodo) VALUES (?, ?, ?)',
      [id, quantidade, periodo]
    );
    res.status(201).json({ message: "Consumo registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar consumo", details: error.message });
  }
});

/**
 * @swagger
 * /materia-prima/consumo:
 *   get:
 *     summary: Obtém o consumo total de matéria-prima por período
 *     tags: [Matéria-Prima]
 *     parameters:
 *       - in: query
 *         name: periodo
 *         required: true
 *         schema:
 *           type: string
 *           
 *     responses:
 *       200:
 *         description: Lista de consumo de matéria-prima no período
 *       400:
 *         description: Parâmetro de período ausente
 *       500:
 *         description: Erro ao obter consumo de matéria-prima
 */
router.get('/consumo', async (req, res) => {
  const { periodo } = req.query;

  if (!periodo) {
    return res.status(400).json({ error: "O parâmetro 'periodo' é obrigatório" });
  }

  try {
    const [rows] = await pool.query(`
      SELECT mp.id, mp.nome, SUM(cmp.quantidade) AS total_consumo
      FROM materia_prima mp
      LEFT JOIN consumo_materia_prima cmp ON mp.id = cmp.materia_prima_id AND cmp.periodo = ?
      GROUP BY mp.id, mp.nome
      ORDER BY total_consumo DESC
    `, [periodo]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter consumo de matéria-prima", details: error.message });
  }
});


module.exports = router;
