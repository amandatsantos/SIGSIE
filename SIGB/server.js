const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const setupSwagger = require('./swagger'); 
const initializeDatabase = require('./setupDB'); // esquema do db criado

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Inicializar banco de dados e tabelas antes de iniciar o servidor
(async () => {
    await initializeDatabase();
  })();

// Configurar Swagger
setupSwagger(app);

// conferir
app.get('/', (req, res) => res.send('API funcionando!'));

//  rotas
const materiaPrimaRoutes = require('./routes/materiaPrima');
const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');
const relatoriosRoutes = require("./routes/relatorios");
const desempenhoRoutes = require("./routes/desempenho");
const importacaoRoutes = require("./routes/importacao");
const metasRoutes = require("./routes/metas");

app.use('/materia-prima', materiaPrimaRoutes);
app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes);
app.use("/relatorios", relatoriosRoutes);
app.use("/comparar-desempenho", desempenhoRoutes);
app.use("/importar-dados", importacaoRoutes);
app.use("/configurar-metas", metasRoutes);

// Iniciar servidor co a s infos
const PORT = 5560;
app.listen(PORT, () => console.log(`Servidor rodando na porta - ${PORT} \n  http://localhost:${PORT} \n swagger -> http://localhost:${PORT}/api-docs`));
