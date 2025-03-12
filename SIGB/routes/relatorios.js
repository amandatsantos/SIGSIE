const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /relatorios:
 *   get:
 *     summary: Retorna relatórios personalizados
 *     description: Endpoint para visualizar relatórios personalizados.
 *     responses:
 *       200:
 *         description: Lista de relatórios
 */
router.get("/", (req, res) => {
  res.json({ message: "Relatórios personalizados" });
});

module.exports = router;