const express = require("express");
const pool = require("../db"); // Certifique-se de que o pool está sendo importado corretamente
const router = express.Router();

/**
 * @swagger
 * /relatorio:
 *   get:
 *     summary: Retorna relatórios personalizados
 *     description: Endpoint para visualizar relatórios personalizados.
 *     responses:
 *       200:
 *         description: Lista de relatórios
 */
router.get("/relatorio", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM relatorio WHERE id = 1");
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar os relatórios:", err);
    res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
});

const updateField = async (req, res, field) => {
  const value = req.body[field];

  if (value === undefined || typeof value !== "number") {
    return res.status(400).json({ error: `O campo '${field}' é obrigatório e deve ser um número.` });
  }

  try {
    const query = `
      UPDATE relatorio 
      SET ${field} = ?
      WHERE id = 1
    `;
    await pool.query(query, [value]);
    res.json({ message: `${field} atualizado com sucesso!` });
  } catch (err) {
    console.error(`Erro ao atualizar ${field}:`, err);
    res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
};

/**
 * @swagger
 * /update_vendas:
 *   post:
 *     summary: Atualiza o valor de vendas no relatório
 *     description: Endpoint para atualizar o valor de vendas no relatório.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venda:
 *                 type: integer
 *                 description: Valor de vendas a ser atualizado.
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/update_vendas", (req, res) => updateField(req, res, "venda"));

/**
 * @swagger
 * /update_faturamento:
 *   post:
 *     summary: Atualiza o valor de faturamento no relatório
 *     description: Endpoint para atualizar o valor de faturamento no relatório.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               faturamento:
 *                 type: integer
 *                 description: Valor de faturamento a ser atualizado.
 *     responses:
 *       200:
 *         description: Faturamento atualizado com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/update_faturamento", (req, res) => updateField(req, res, "faturamento"));

/**
 * @swagger
 * /update_estoque:
 *   post:
 *     summary: Atualiza o valor de estoque no relatório
 *     description: Endpoint para atualizar o valor de estoque no relatório.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estoque:
 *                 type: integer
 *                 description: Valor de estoque a ser atualizado.
 *     responses:
 *       200:
 *         description: Estoque atualizado com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/update_estoque", (req, res) => updateField(req, res, "estoque"));

/**
 * @swagger
 * /update_producao:
 *   post:
 *     summary: Atualiza o valor de produção no relatório
 *     description: Endpoint para atualizar o valor de produção no relatório.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producao:
 *                 type: integer
 *                 description: Valor de produção a ser atualizado.
 *     responses:
 *       200:
 *         description: Produção atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/update_producao", (req, res) => updateField(req, res, "producao"));

module.exports = router;
