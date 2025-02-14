const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

async function initializeDatabase() {
  try {
    // Conectar ao MySQL sem selecionar um banco de dados
    const connection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'root',
    });

    // Criar o banco de dados se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    console.log(`Banco de dados '${DB_DATABASE}' pronto!`);

    // Fechar conexão temporária
    await connection.end();

    // Criar tabelas após garantir a existência do banco
    await createTables();
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1); // Finaliza o processo em caso de erro grave
  }
}

async function createTables() {
  try {
    const pool = mysql.createPool({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'root',
      database:DB_DATABASE|| 'dbsig',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS materia_prima (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          quantidade FLOAT NOT NULL,
          unidade VARCHAR(20) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS produtos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          descricao TEXT,
          preco DECIMAL(10,2) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS fornecedores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          contato VARCHAR(100) NOT NULL
      );
    `);

    console.log('Tabelas verificadas/criadas com sucesso!');
    await pool.end();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
}

// Exportar função de inicialização para uso em outros arquivos
module.exports = initializeDatabase;
