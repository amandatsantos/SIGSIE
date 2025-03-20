"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [searchTermFornecedores, setSearchTermFornecedores] = useState('');
  const [searchTermProdutos, setSearchTermProdutos] = useState('');
  const [searchTermMateriasPrimas, setSearchTermMateriasPrimas] = useState('');
  const [currentPageFornecedores, setCurrentPageFornecedores] = useState(1);
  const [currentPageProdutos, setCurrentPageProdutos] = useState(1);
  const [currentPageMateriasPrimas, setCurrentPageMateriasPrimas] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Dados de exemplo com 15 itens
  const fornecedores = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nome: `Fornecedor ${i + 1}`,
    contato: `(77) 90000-${String(i + 1).padStart(4, '0')}`,
    tipo: 'Choco 75%',
  }));

  const produtos = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nome: `Produto ${i + 1}`,
    ingredientes: ['Cacau', 'Açúcar de Coco'],
    custo: `R$ ${5 + i},00`,
    categoria: 'Doces',
    preco: `R$ ${10 + i},00`,
  }));

  const materiasPrimas = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nome: `Matéria-Prima ${i + 1}`,
    descricao: 'Descrição',
    fornecedor: `Fornecedor ${i + 1}`,
    estoque: `${500 - i * 10} kg`,
    preco: `R$ ${20 - i},00/kg`,
  }));

  const handleSearchChangeFornecedores = (event) => {
    setSearchTermFornecedores(event.target.value.toLowerCase());
    setCurrentPageFornecedores(1); // Resetar para a primeira página ao pesquisar
  };

  const handleSearchChangeProdutos = (event) => {
    setSearchTermProdutos(event.target.value.toLowerCase());
    setCurrentPageProdutos(1); // Resetar para a primeira página ao pesquisar
  };

  const handleSearchChangeMateriasPrimas = (event) => {
    setSearchTermMateriasPrimas(event.target.value.toLowerCase());
    setCurrentPageMateriasPrimas(1); // Resetar para a primeira página ao pesquisar
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const filterItems = (items, searchTerm) => {
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
  };

  const paginate = (items, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const filteredFornecedores = filterItems(fornecedores, searchTermFornecedores);
  const filteredProdutos = filterItems(produtos, searchTermProdutos);
  const filteredMateriasPrimas = filterItems(materiasPrimas, searchTermMateriasPrimas);

  const currentFornecedores = paginate(filteredFornecedores, currentPageFornecedores, itemsPerPage);
  const currentProdutos = paginate(filteredProdutos, currentPageProdutos, itemsPerPage);
  const currentMateriasPrimas = paginate(filteredMateriasPrimas, currentPageMateriasPrimas, itemsPerPage);

  const totalPagesFornecedores = Math.ceil(filteredFornecedores.length / itemsPerPage);
  const totalPagesProdutos = Math.ceil(filteredProdutos.length / itemsPerPage);
  const totalPagesMateriasPrimas = Math.ceil(filteredMateriasPrimas.length / itemsPerPage);

  const handlePageChange = (setCurrentPage, newPage, totalPages) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = (currentPage, totalPages, setCurrentPage, filteredItems) => {
    return (
      <div className={styles.pagination}>
        <span className={styles.paginationText}>Itens por página</span>
        <span className={styles.paginationText}>{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredItems.length)} de ${filteredItems.length}`}</span>
        <button onClick={() => handlePageChange(setCurrentPage, 1, totalPages)} disabled={currentPage === 1}>
          <SkipPreviousIcon />
        </button>
        <button onClick={() => handlePageChange(setCurrentPage, currentPage - 1, totalPages)} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => handlePageChange(setCurrentPage, Number(e.target.value), totalPages)}
          min={1}
          max={totalPages}
          className={styles.pageInput}
        />
        <button onClick={() => handlePageChange(setCurrentPage, currentPage + 1, totalPages)} disabled={currentPage === totalPages}>
          <NavigateNextIcon />
        </button>
        <button onClick={() => handlePageChange(setCurrentPage, totalPages, totalPages)} disabled={currentPage === totalPages}>
          <SkipNextIcon />
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => handleNavigation('/')}>
          <img src='/Logo 2.png' alt="Logo" />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li onClick={() => handleNavigation('/Screens/Nossos_Chocolates')}>Nossos Chocolates</li>
            <li onClick={() => handleNavigation('/Screens/Dashboard')}>Dashboard</li>
            <li onClick={() => handleNavigation('/Screens/Relatorios')}>Relatórios</li>
          </ul>
        </nav>
        <button className={styles.loginButton} onClick={() => handleNavigation('/login')}>Login</button>
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.welcomeMessage}>Seja bem-vindo, Usuário!</h1>
          <h1 className={styles.tituloDashboard}>Dashboard</h1>
          <p className={styles.subtituloDashboard}>Gerencie as métricas do sistema através de tabelas e gráficos, definindo meta para a empresa.</p>
        </div>

        {/* Tabela de Fornecedores */}
        <div className={styles.fornecedoresContainer}>
          <h2 className={styles.tituloSecao}>Fornecedores</h2>
          <div className={styles.searchAddContainer}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.searchInput}
                value={searchTermFornecedores}
                onChange={handleSearchChangeFornecedores}
              />
            </div>
            <button className={styles.addButton}>Adicionar</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Contato</th>
                  <th>Tipo de Matéria-Prima</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentFornecedores.map((fornecedor, index) => (
                  <tr key={fornecedor.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{fornecedor.id}</td>
                    <td>{fornecedor.nome}</td>
                    <td>{fornecedor.contato}</td>
                    <td>{fornecedor.tipo}</td>
                    <td>
                      <button className={styles.actionButton}>
                        < EditNoteIcon />
                      </button>
                      <button className={styles.actionButton}>
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {renderPagination(currentPageFornecedores, totalPagesFornecedores, setCurrentPageFornecedores, filteredFornecedores)}
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className={styles.fornecedoresContainer}>
          <h2 className={styles.tituloSecao}>Produtos</h2>
          <div className={styles.searchAddContainer}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.searchInput}
                value={searchTermProdutos}
                onChange={handleSearchChangeProdutos}
              />
            </div>
            <button className={styles.addButton}>Adicionar</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Ingredientes</th>
                  <th>Custo de Produção</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentProdutos.map((produto, index) => (
                  <tr key={produto.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.ingredientes.join(', ')}</td>
                    <td>{produto.custo}</td>
                    <td>{produto.categoria}</td>
                    <td>{produto.preco}</td>
                    <td>
                      <button className={styles.actionButton}>
                        <EditNoteIcon />
                      </button>
                      <button className={styles.actionButton}>
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {renderPagination(currentPageProdutos, totalPagesProdutos, setCurrentPageProdutos, filteredProdutos)}
          </div>
        </div>

        {/* Tabela de Matéria-Prima */}
        <div className={styles.fornecedoresContainer}>
          <h2 className={styles.tituloSecao}>Matéria-Prima</h2>
          <div className={styles.searchAddContainer}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.searchInput}
                value={searchTermMateriasPrimas}
                onChange={handleSearchChangeMateriasPrimas}
              />
            </div>
            <button className={styles.addButton}>Adicionar</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Fornecedor</th>
                  <th>Estoque Atual</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentMateriasPrimas.map((materia, index) => (
                  <tr key={materia.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{materia.id}</td>
                    <td>{materia.nome}</td>
                    <td>{materia.descricao}</td>
                    <td>{materia.fornecedor}</td>
                    <td>{materia.estoque}</td>
                    <td>{materia.preco}</td>
                    <td>
                      <button className={styles.actionButton}>
                        <EditNoteIcon />
                      </button>
                      <button className={styles.actionButton}>
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {renderPagination(currentPageMateriasPrimas, totalPagesMateriasPrimas, setCurrentPageMateriasPrimas, filteredMateriasPrimas)}
          </div>
        </div>
      </main>
    </div>
  );
}