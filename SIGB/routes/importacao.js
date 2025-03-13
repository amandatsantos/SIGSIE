const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const pool = require("../db");  // Certifique-se de que o pool de conexão ao banco de dados está configurado corretamente

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /importar-dados:
 *   post:
 *     summary: Importa dados de arquivos CSV, JSON ou APIs externas
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         required: true
 *         description: Arquivo CSV ou JSON para importação
 *         type: file
 *     responses:
 *       200:
 *         description: Dados importados com sucesso
 */
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const filePath = req.file.path;

  if (req.file.mimetype === "text/csv") {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        // Verificar estrutura dos dados CSV antes de adicionar
        if (!data.nome || !data.quantidade || !data.unidade) {
          return res.status(400).json({ error: "Dados do CSV estão incompletos ou inválidos" });
        }
        results.push(data);
      })
      .on("end", async () => {
        try {
          // Inserir os dados do CSV no banco de dados
          for (const item of results) {
            await pool.query(
              "INSERT INTO materia_prima (nome, quantidade, unidade, periodo) VALUES (?, ?, ?, ?)",
              [item.nome, item.quantidade, item.unidade, item.periodo || "default"]
            );
          }
          fs.unlinkSync(filePath); // Remover arquivo após processamento
          res.json({ message: "Dados importados com sucesso", data: results });
        } catch (error) {
          res.status(500).json({ error: "Erro ao salvar dados no banco de dados", details: error.message });
        }
      });
  } else if (req.file.mimetype === "application/json") {
    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Verificar se os dados JSON têm a estrutura correta
      if (!Array.isArray(jsonData)) {
        return res.status(400).json({ error: "Os dados JSON devem ser um array" });
      }

      for (const item of jsonData) {
        if (!item.nome || !item.quantidade || !item.unidade) {
          return res.status(400).json({ error: "Dados JSON estão incompletos ou inválidos" });
        }
        // Inserir dados do JSON no banco
        await pool.query(
          "INSERT INTO materia_prima (nome, quantidade, unidade, periodo) VALUES (?, ?, ?, ?)",
          [item.nome, item.quantidade, item.unidade, item.periodo || "default"]
        );
      }

      fs.unlinkSync(filePath); // Remover arquivo após processamento
      res.json({ message: "Dados importados com sucesso", data: jsonData });
    } catch (error) {
      fs.unlinkSync(filePath); // Remover arquivo em caso de erro
      res.status(500).json({ error: "Erro ao processar arquivo JSON", details: error.message });
    }
  } else {
    fs.unlinkSync(filePath); // Remover arquivo se o tipo não for suportado
    res.status(400).json({ error: "Formato de arquivo não suportado" });
  }
});

module.exports = router;
