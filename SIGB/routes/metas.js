const express = require("express");
const pool = require("../db");  
const router = express.Router();

/**
 * @swagger
 * /configurar-metas:
 *   post:
 *     summary: Configura metas personalizadas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_meta:
 *                 type: string
 *                 example: "materia-prima"
 *               valor:
 *                 type: number
 *                 example: 500
 *               periodo:
 *                 type: string
 *                 example: "2024-Q1"
 *     responses:
 *       200:
 *         description: Meta configurada com sucesso
 */
router.post("/", async (req, res) => {
  const { tipo_meta, valor, periodo } = req.body;

  if (!tipo_meta || !valor || !periodo) {
    return res.status(400).json({ error: "Tipo da meta, valor e período são obrigatórios" });
  }

  try {
    // Inserir meta no banco de dados
    const [result] = await pool.query(
      "INSERT INTO metas (tipo_meta, valor, periodo) VALUES (?, ?, ?)",
      [tipo_meta, valor, periodo]
    );

    res.status(200).json({
      message: "Meta configurada com sucesso",
      tipo_meta,
      valor,
      periodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao configurar a meta", details: error.message });
  }
});

/**
 * @swagger
 * /metas/{tipoMeta}/{periodo}:
 *   get:
 *     summary: Obtém a meta configurada para um tipo e período específicos
 *     parameters:
 *       - in: path
 *         name: tipoMeta
 *         required: true
 *         schema:
 *           type: string
 *        
 *       - in: path
 *         name: periodo
 *         required: true
 *         schema:
 *           type: string
 *         
 *     responses:
 *       200:
 *         description: Meta encontrada
 *       404:
 *         description: Meta não encontrada
 *       500:
 *         description: Erro ao buscar meta
 */
router.get("/:tipoMeta/:periodo", async (req, res) => {
  const { tipoMeta, periodo } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM metas WHERE tipo_meta = ? AND periodo = ?",
      [tipoMeta, periodo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Meta não encontrada para esse tipo e período" });
    }

    res.json(rows[0]);  // Retorna a meta encontrada
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar meta", details: error.message });
  }
});

/**
 * @swagger
 * /metas/{tipoMeta}/{periodo}/verificar:
 *   get:
 *     summary: Verifica o cumprimento da meta
 *     parameters:
 *       - in: path
 *         name: tipoMeta
 *         required: true
 *         schema:
 *           type: string
 *        
 *       - in: path
 *         name: periodo
 *         required: true
 *         schema:
 *           type: string
 *       
 *     responses:
 *       200:
 *         description: Verificação da meta
 *       404:
 *         description: Meta não encontrada
 *       500:
 *         description: Erro ao verificar meta
 */
router.get("/:tipoMeta/:periodo/verificar", async (req, res) => {
  const { tipoMeta, periodo } = req.params;

  try {
    // Verificar a meta
    const [meta] = await pool.query(
      "SELECT * FROM metas WHERE tipo_meta = ? AND periodo = ?",
      [tipoMeta, periodo]
    );

    if (meta.length === 0) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    // Obter valor real de desempenho, por exemplo, consumo de matéria-prima
    const [desempenho] = await pool.query(
      "SELECT SUM(quantidade) AS total_consumo FROM consumo_materia_prima WHERE periodo = ?",
      [periodo]
    );

    const metaValor = meta[0].valor;
    const totalDesempenho = desempenho[0].total_consumo || 0;

    const resultado = {
      meta: metaValor,
      desempenho: totalDesempenho,
      atingiuMeta: totalDesempenho >= metaValor,
    };

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao verificar meta", details: error.message });
  }
});

module.exports = router;
