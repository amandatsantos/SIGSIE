'use client';
import styles from '../page.module.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaTrash, FaUser, FaPhone, FaBox } from 'react-icons/fa';

export default function Materia_Prima() {
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
    const [selectedMateria, setSelectedMateria] = useState(null);

    const [materia, setMateria] = useState([
        { id: 1, nome: 'Chocolate', descricao: '75% cacau', fornecedor: 'Cacau Show', estoque:'1.000', preco:'R$ 720,00'},
        { id: 2, nome: 'Chocolate', descricao: '75% cacau', fornecedor: 'Cacau Show', estoque:'1.000', preco:'R$ 720,00'},
        { id: 3, nome: 'Chocolate', descricao: '75% cacau', fornecedor: 'Cacau Show', estoque:'1.000', preco:'R$ 720,00' },
        { id: 4, nome: 'Chocolate', descricao: '75% cacau', fornecedor: 'Cacau Show', estoque:'1.000', preco:'R$ 720,00' },
    ]);
    const handleEditClick = (materia) => {
        setSelectedMateria(materia);
        setIsOpen2(true);
    };
    const handleDeleteClick = (materia) => {
        setSelectedMateria(materia);
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
                Matéria Prima
            </div>
            <div className={styles.containerhe}>
                <input type="text" placeholder="🔍 Pesquisar..." className={styles.pesquisar} />
                <button onClick={() => setIsOpen(true)} className={styles.button3}>Adicionar Matéria Prima
                </button>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Fornecedor</th>
                        <th>Estoque atual</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {materia.map((materia) => (
                        <tr key={materia.id}>
                            <td>{materia.id}</td>
                            <td>{materia.nome}</td>
                            <td>{materia.descricao}</td>
                            <td>{materia.fornecedor}</td>
                            <td>{materia.estoque}</td>
                            <td>{materia.preco}</td>
                            <td>
                            <FaEdit onClick={() => handleEditClick(materia)} className={styles.icone} />
                            <FaTrash onClick={() => handleDeleteClick(materia)} className={styles.icone} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2 >Adicionar Materia Prima</h2>
                            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.inputGroup}>
                                <label>Nome</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Digite o nome da materia prima' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Fornecedor</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>👤</span>
                                    <input type="text" placeholder='Digite o nome do fornecedor' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Estoque atual</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>➕</span>
                                    <input type="text" placeholder='Digite a quantidade da materia prima' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Preço</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite a preço' className={styles.input} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Descrição</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📝</span>
                                    <input type="text" placeholder='Digite uma descrição da materia prima' className={styles.input} />
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
                            <h2>Atualizar Materia Prima</h2>
                            <button onClick={() => setIsOpen2(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                        <div className={styles.inputGroup}>
                                <label>Nome</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📦</span>
                                    <input type="text" placeholder='Digite o nome da materia prima' className={styles.input} value={selectedMateria?.nome || ''}/>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Fornecedor</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>👤</span>
                                    <input type="text" placeholder='Digite o nome do fornecedor' className={styles.input} value={selectedMateria?.fornecedor || ''}/>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Estoque atual</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>➕</span>
                                    <input type="text" placeholder='Digite a quantidade da materia prima' className={styles.input} value={selectedMateria?.estoque || ''}/>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Preço</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>💰</span>
                                    <input type="text" placeholder='Digite a preço' className={styles.input} value={selectedMateria?.preco || ''} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Descrição</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.icon}>📝</span>
                                    <input type="text" placeholder='Digite uma descrição da materia prima' className={styles.input} value={selectedMateria?.descricao || ''} />
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
                            <h2>Deletar Matéria Prima</h2>
                            <button onClick={() => setIsOpen3(false)} className={styles.closeButton}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Tem certeza que deseja deletar essa matéria prima ?</p>
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