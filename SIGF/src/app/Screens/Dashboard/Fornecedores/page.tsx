'use client';
import styles from '../page.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaTrash, FaUser, FaPhone, FaBox } from 'react-icons/fa';

export default function Fornecedores() {
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
    const [selectedFornecedor, setSelectedFornecedor] = useState(null);

    const [fornecedores, setFornecedores] = useState([
        { id: 1, nome: 'Chico Mendes', contato: '(77) 90000-0000', materiaPrima: 'Choco 75%' },
        { id: 2, nome: 'Silva', contato: '(77) 90000-1234', materiaPrima: 'Choco 75%' },
        { id: 3, nome: 'Cacau Show', contato: '(77) 90700-0000', materiaPrima: 'Choco7 5%' },
        { id: 4, nome: 'IF Baiano', contato: '(77) 90000-5478', materiaPrima: 'Choco 75%' },
    ]);
    const handleEditClick = (fornecedor) => {
        setSelectedFornecedor(fornecedor);
        setIsOpen2(true);
    };
    const handleDeleteClick = (fornecedor) => {
        setSelectedFornecedor(fornecedor);
        setIsOpen3(true);
    }
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo} onClick={handleLogoClick}>
                    <img src='/Logo 2.png' alt="Logo" />
                </div>
                <nav className={styles.nav}>
                    <button className={styles.button} onClick={handleDashboard}> Dashboard</button>
                    <button className={styles.button} onClick={handleMateria_Prima}>Materia Prima</button>
                    <button className={styles.button} onClick={handleProdutos}>Produtos</button>
                    <button className={styles.button} onClick={handleFornecedores}>Fornecedores</button>
                </nav>
            </header>
            <div className={styles.welcome}>
                Fornecedores
            </div>
            <div className={styles.containerhe}>
                <input type="text" placeholder="🔍 Pesquisar..." className={styles.pesquisar} />
                <button onClick={() => setIsOpen(true)} className={styles.button3}>Adicionar Fornecedores
                </button>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Tipo de matéria-prima</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {fornecedores.map((fornecedor) => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.id}</td>
                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.contato}</td>
                            <td>{fornecedor.materiaPrima}</td>
                            <td>
                            <FaEdit onClick={() => handleEditClick(fornecedor)} className={styles.icone} />
                            <FaTrash onClick={() => handleDeleteClick(fornecedor)} className={styles.icone} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2 >Adicionar fornecedores</h2>
                            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Fornecedor</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>👤</span>
                                    <input type="text" placeholder='Chico Mendes' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Contato</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📞</span>
                                    <input type="text" placeholder='(77) 90000-0000' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Tipo de matéria-prima</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Choco 75%' className={styles.input} />
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
                            <h2>Atualizar fornecedores</h2>
                            <button onClick={() => setIsOpen2(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Fornecedor</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>👤</span>
                                    <input type="text" placeholder='Fornecedor' className={styles.input} value={selectedFornecedor?.nome || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Contato</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📞</span>
                                    <input type="text" placeholder='Contato' className={styles.input} value={selectedFornecedor?.contato || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Tipo de matéria-prima</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Tipo de matéria-prima' className={styles.input} value={selectedFornecedor?.materiaPrima || ''} />
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
                            <h2>Excluir fornecedores</h2>
                            <button onClick={() => setIsOpen3(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Tem certeza que deseja excluir o fornecedor?</p>
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