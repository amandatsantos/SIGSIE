const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /comparar-desempenho:
 *   get:
 *     summary: Compara desempenho entre períodos ou organizações
 *     parameters:
 *       - name: periodo
 *         in: query
 *         description: Período de tempo para comparação
 *         schema:
 *           type: string
 *       - name: organizacao
 *         in: query
 *         description: Organização para comparação
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultado da comparação de desempenho
 */
router.get("/", (req, res) => {
  const { periodo, organizacao } = req.query;
  res.json({ message: `Comparando desempenho para ${periodo || "todos períodos"} e organização ${organizacao || "todas"}` });
});

module.exports = router;
