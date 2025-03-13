const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /comparar-desempenho:
 *   get:
 *     summary: Compara desempenho entre períodos
 *     tags: [Desempenho]
 *     parameters:
 *       - name: periodoAtual
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: periodoAnterior
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comparação de métricas entre períodos
 */
router.get("/", async (req, res) => {
  const { periodoAtual, periodoAnterior } = req.query;

  if (!periodoAtual || !periodoAnterior) {
    return res.status(400).json({ error: "Os parâmetros 'periodoAtual' e 'periodoAnterior' são obrigatórios" });
  }

  try {
    // 🛒 Total de produtos cadastrados por período
    const [produtosAtual] = await db.query("SELECT COUNT(*) AS total FROM produtos WHERE periodo = ?", [periodoAtual]);
    const [produtosAnterior] = await db.query("SELECT COUNT(*) AS total FROM produtos WHERE periodo = ?", [periodoAnterior]);

    // 💰 Preço médio dos produtos por período
    const [mediaPrecoAtual] = await db.query("SELECT AVG(preco) AS media FROM produtos WHERE periodo = ?", [periodoAtual]);
    const [mediaPrecoAnterior] = await db.query("SELECT AVG(preco) AS media FROM produtos WHERE periodo = ?", [periodoAnterior]);

    // 📦 Total de matéria-prima consumida por período
    const [materiaPrimaAtual] = await db.query("SELECT SUM(quantidade) AS total FROM materia_prima WHERE periodo = ?", [periodoAtual]);
    const [materiaPrimaAnterior] = await db.query("SELECT SUM(quantidade) AS total FROM materia_prima WHERE periodo = ?", [periodoAnterior]);

    // 🚚 Eficiência dos fornecedores (número de pedidos por fornecedor)
    const [fornecedoresAtual] = await db.query(
      "SELECT f.nome, COUNT(p.id) AS total_pedidos FROM fornecedores f JOIN pedidos p ON f.id = p.fornecedor_id WHERE p.periodo = ? GROUP BY f.nome",
      [periodoAtual]
    );
    const [fornecedoresAnterior] = await db.query(
      "SELECT f.nome, COUNT(p.id) AS total_pedidos FROM fornecedores f JOIN pedidos p ON f.id = p.fornecedor_id WHERE p.periodo = ? GROUP BY f.nome",
      [periodoAnterior]
    );

    // 🔢 Cálculo de variações
    const variacaoPreco = mediaPrecoAnterior[0].media
      ? (((mediaPrecoAtual[0].media || 0) - mediaPrecoAnterior[0].media) / mediaPrecoAnterior[0].media) * 100
      : 0;
    const variacaoMateriaPrima = materiaPrimaAnterior[0].total
      ? (((materiaPrimaAtual[0].total || 0) - materiaPrimaAnterior[0].total) / materiaPrimaAnterior[0].total) * 100
      : 0;

    // 📊 Tendências automáticas
    const tendenciaPreco = variacaoPreco > 0 ? "Alta nos preços" : variacaoPreco < 0 ? "Queda nos preços" : "Estável";
    const tendenciaMateriaPrima = variacaoMateriaPrima > 0 ? "Maior consumo" : variacaoMateriaPrima < 0 ? "Menor consumo" : "Estável";

    res.json({
      message: "Comparação de desempenho realizada",
      comparacao: {
        produtos: {
          periodoAtual: produtosAtual[0].total,
          periodoAnterior: produtosAnterior[0].total,
          diferenca: produtosAtual[0].total - produtosAnterior[0].total,
        },
        precoMedio: {
          periodoAtual: mediaPrecoAtual[0].media || 0,
          periodoAnterior: mediaPrecoAnterior[0].media || 0,
          variacaoPercentual: variacaoPreco.toFixed(2) + "%",
          tendencia: tendenciaPreco,
        },
        materiaPrima: {
          periodoAtual: materiaPrimaAtual[0].total || 0,
          periodoAnterior: materiaPrimaAnterior[0].total || 0,
          variacaoPercentual: variacaoMateriaPrima.toFixed(2) + "%",
          tendencia: tendenciaMateriaPrima,
        },
        eficienciaFornecedores: {
          periodoAtual: fornecedoresAtual,
          periodoAnterior: fornecedoresAnterior,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na comparação", details: error.message });
  }
});

module.exports = router;
