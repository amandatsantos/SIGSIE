const express = require("express");
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
 *               meta:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Meta configurada com sucesso
 */
router.post("/", (req, res) => {
  const { meta, valor } = req.body;
  if (!meta || !valor) {
    return res.status(400).json({ error: "Meta e valor são obrigatórios" });
  }
  res.json({ message: "Meta configurada", meta, valor });
});

module.exports = router;
