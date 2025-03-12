const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

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
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const filePath = req.file.path;

  if (req.file.mimetype === "text/csv") {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        fs.unlinkSync(filePath);
        res.json({ message: "Dados importados com sucesso", data: results });
      });
  } else if (req.file.mimetype === "application/json") {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    fs.unlinkSync(filePath);
    res.json({ message: "Dados importados com sucesso", data: jsonData });
  } else {
    fs.unlinkSync(filePath);
    res.status(400).json({ error: "Formato de arquivo não suportado" });
  }
});

module.exports = router;
