const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const setupSwagger = require('./swagger'); 
const initializeDatabase = require('./setupDB');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Permitir credenciais nas requisições CORS LEMNBRAR DE USAr
app.use(bodyParser.json());

// Configuração do armazenamento da sessão no MySQL
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "1029384756",
    database:"bdsig",
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutos
    expiration: 86400000, // 1 dia
});

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'teste',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 86400000 },
  })
);

(async () => {
    try {
        await initializeDatabase();
        console.log("Banco de dados inicializado");
    } catch (error) {
        console.error("Erro ao iniciar o banco de dados:", error.message);
    }
})();

setupSwagger(app);

app.get('/', (req, res) => res.send('API funcionando!'));

// Importação de rotas
const materiaPrimaRoutes = require('./routes/materiaPrima');
const produtosRoutes = require('./routes/produtos');
const fornecedoresRoutes = require('./routes/fornecedores');
const relatoriosRoutes = require("./routes/relatorios");
const desempenhoRoutes = require("./routes/desempenho");
const importacaoRoutes = require("./routes/importacao");
const metasRoutes = require("./routes/metas");




const authRoutes = require("./routes/auth");


app.use("/auth", authRoutes);
app.use('/materia-prima', materiaPrimaRoutes);
app.use('/produtos', produtosRoutes);
app.use('/fornecedores', fornecedoresRoutes);
app.use("/relatorios", relatoriosRoutes);
app.use("/comparar-desempenho", desempenhoRoutes);
app.use("/importar-dados", importacaoRoutes);
app.use("/configurar-metas", metasRoutes);


const PORT = process.env.PORT || 5665;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}\nhttp://localhost:${PORT}\nSwagger: http://localhost:${PORT}/api-docs`));
