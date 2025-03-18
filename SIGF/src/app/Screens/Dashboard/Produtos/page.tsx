'use client';
import styles from '../page.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaTrash, FaUser, FaPhone, FaBox } from 'react-icons/fa';

export default function Produtos() {
    const router = useRouter();
    const handleLogoClick = () => {
        router.push('/Screens/LandingPage');
    };
    const handleDashboard = () => {
        router.push('/Screens/Dashboard');
    };
    const handleMateria_Prima = () => {
        router.push('/Screens/Dashboard/Materia_Prima');
    };
    const handleProdutos = () => {
        router.push('/Screens/Dashboard/Produtos');
    };
    const handleFornecedores = () => {
        router.push('/Screens/Dashboard/Fornecedores');
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedProdutos, setSelectedProdutos] = useState(null);

    const [produtos, setProdutos] = useState([
        { id: 1, nome: 'Chocolate', ingredientes: '75% cacau', custo: 'R$333,00', categoria: '1.000', preco: 'R$ 720,00' },
        { id: 2, nome: 'Chocolate', ingredientes: '75% cacau', custo: 'R$33,00', categoria: '2.000', preco: 'R$ 720,00' },
        { id: 3, nome: 'Chocolate', ingredientes: '75% cacau', custo: 'R$355,00', categoria: '66.000', preco: 'R$ 720,00' },
        { id: 4, nome: 'Chocolate', ingredientes: '75% cacau', custo: 'R$45,00', categoria: '2.000', preco: 'R$ 720,00' },
    ]);
    const handleEditClick = (produtos) => {
        setSelectedProdutos(produtos);
        setIsOpen2(true);
    };
    const handleDeleteClick = (produtos) => {
        setSelectedProdutos(produtos);
        setIsOpen3(true);
    }
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo} onClick={handleLogoClick}>
                    <img src='/Logo 2.png' alt="Logo" />
                </div>
                <nav className={styles.nav}>
                    <button className={styles.button} onClick={handleDashboard}>Dashboard</button>
                    <button className={styles.button} onClick={handleMateria_Prima}>Matéria Prima</button>
                    <button className={styles.button} onClick={handleProdutos}>Produtos</button>
                    <button className={styles.button} onClick={handleFornecedores}>Fornecedores</button>
                </nav>
            </header>
            <div className={styles.welcome}>
                Produtos
            </div>
            <div className={styles.containerhe}>
                <input type="text" placeholder="🔍 Pesquisar..." className={styles.pesquisar} />
                <button onClick={() => setIsOpen(true)} className={styles.button3}>Adicionar Produto
                </button>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Ingredientes</th>
                        <th>Custos de Produção</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {produtos.map((produtos) => (
                        <tr key={produtos.id}>
                            <td>{produtos.id}</td>
                            <td>{produtos.nome}</td>
                            <td>{produtos.ingredientes}</td>
                            <td>{produtos.custo}</td>
                            <td>{produtos.categoria}</td>
                            <td>{produtos.preco}</td>
                            <td>
                                <FaEdit onClick={() => handleEditClick(produtos)} className={styles.icone} />
                                <FaTrash onClick={() => handleDeleteClick(produtos)} className={styles.icone} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2 >Adicionar Produto</h2>
                            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Nome</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Digite o nome do Produto' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Ingredientes</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>🛒</span>
                                    <input type="text" placeholder='Digite os ingredientes da produção' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Custo de Produção</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite o custo total da produção' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Categoria</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>🏷️</span>
                                    <input type="text" placeholder='Dropdown' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Preço</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite a preço' className={styles.input} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setIsOpen(false)} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button className={styles.addButton}>
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isOpen2 && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>Atualizar Produto</h2>
                            <button onClick={() => setIsOpen2(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Nome</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Digite o nome do Produto' className={styles.input} value={selectedProdutos?.nome || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Ingredientes</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>🛒</span>
                                    <input type="text" placeholder='Digite os ingredientes da produção' className={styles.input} value={selectedProdutos?.ingredientes || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Custo de Produção</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite o custo total da produção' className={styles.input} value={selectedProdutos?.custo || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Categoria</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>🏷️</span>
                                    <input type="text" placeholder='Dropdown' className={styles.input} value={selectedProdutos?.categoria || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Preço</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite a preço' className={styles.input} value={selectedProdutos?.preco || ''} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setIsOpen2(false)} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button className={styles.addButton}>
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isOpen3 && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>Deletar Produto</h2>
                            <button onClick={() => setIsOpen3(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Tem certeza que deseja deletar esse produto ?</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setIsOpen3(false)} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button className={styles.addButton}>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}