'use client';
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaTrash, FaBox } from 'react-icons/fa';

export default function Dashboard() {
    const router = useRouter();
    const [tabelaAtual, setTabelaAtual] = useState('fornecedores');
    const [dados, setDados] = useState({
        fornecedores: [
            { id: 1, nome: 'Chico Mendes', contato: '(77) 90000-0000', tipo: 'Choco 75%' },
            { id: 2, nome: 'Silva', contato: '(77) 90000-1234', tipo: 'Choco 75%' }
        ],
        produtos: [
            { id: 1, nome: 'Chocolate Amargo', preco: 'R$10,00', estoque: 50 },
            { id: 2, nome: 'Chocolate ao Leite', preco: 'R$8,00', estoque: 70 }
        ],
        materiaPrima: [
            { id: 1, nome: 'Cacau', quantidade: '100kg', fornecedor: 'Chico Mendes' },
            { id: 2, nome: 'Leite', quantidade: '50L', fornecedor: 'Silva' }
        ]
    });
    const handleDelete = (id) => {
        setDados(prev => ({
            ...prev,
            [tabelaAtual]: prev[tabelaAtual].filter(item => item.id !== id)
        }));
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
                 {/* Navbar  q n existe*/} 
            
                <header className={styles.header}>
                    <h1>Dashboard</h1>
                    <select onChange={(e) => setTabelaAtual(e.target.value)} className={styles.select}>
                        <option value="fornecedores">Fornecedores</option>
                        <option value="produtos">Produtos</option>
                        <option value="materiaPrima">Matéria-prima</option>
                    </select>
                </header>
    
                <div className={styles.gridContainer}>
                    {/* Seção da Tabela */}
                    <div className={styles.tableSection}>
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    {tabelaAtual === 'fornecedores' && <><th>ID</th><th>Nome</th><th>Contato</th><th>Tipo</th></>}
                                    {tabelaAtual === 'produtos' && <><th>ID</th><th>Nome</th><th>Preço</th><th>Estoque</th></>}
                                    {tabelaAtual === 'materiaPrima' && <><th>ID</th><th>Nome</th><th>Quantidade</th><th>Fornecedor</th></>}
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados[tabelaAtual].map((item) => (
                                    <tr key={item.id}>
                                        {Object.values(item).map((valor, index) => <td key={index}>{String(valor)}</td>)}
                                        <td className={styles.actions}>
                                            <FaEdit className={styles.icon} />
                                            <FaTrash className={styles.icon} onClick={() => handleDelete(item.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
    
                    {/* Seção de Metas e Métricas */}
                    <div className={styles.metricsSection}>
                        {/* Metas */}
                        <div className={styles.metas}>
                            <h2 className={styles.sectionTitle}>Metas</h2>
                            <div className={styles.metasGrid}>
                                <div className={`${styles.metaBox} ${styles.production}`}>
                                    <h3>Produção</h3>
                                    <div className={styles.metaContent}>
                                        <div className={styles.metaItem}>
                                            <span>Quantidade:</span>
                                            <span>10.000</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span>Redução:</span>
                                            <span>10%</span>
                                        </div>
                                        <div className={styles.metaActions}>
                                            <button className={styles.btnEdit}><FaEdit /> Editar</button>
                                        </div>
                                    </div>
                                </div>
    
                                <div className={`${styles.metaBox} ${styles.sales}`}>
                                    <h3>Vendas</h3>
                                    <div className={styles.metaContent}>
                                        <div className={styles.metaItem}>
                                            <span>Mensal:</span>
                                            <span>R$ 30.000</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span>Anual:</span>
                                            <span>R$ 100.000</span>
                                        </div>
                                        <div className={styles.metaActions}>
                                            <button className={styles.btnEdit}><FaEdit /> Editar</button>
                                        </div>
                                    </div>
                                </div>
    
                                <div className={`${styles.metaBox} ${styles.stock}`}>
                                    <h3>Estoque</h3>
                                    <div className={styles.metaContent}>
                                        <div className={styles.metaItem}>
                                            <span>Atual:</span>
                                            <span>112Kg</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span>Limite:</span>
                                            <span>200Kg</span>
                                        </div>
                                        <div className={styles.metaActions}>
                                            <button className={styles.btnEdit}><FaEdit /> Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        {/* Métricas */}
                        <div className={styles.metricas}>
                            <h2 className={styles.sectionTitle}>Métricas</h2>
                            <div className={styles.metricsGrid}>
                                {[
                                    { title: 'Produção', value: 52, color: '#f0c040' },
                                    { title: 'Vendas Mensais', value: 30, color: '#3bb273' },
                                    { title: 'Vendas Anuais', value: 45, color: '#3bb273' },
                                    { title: 'Estoque', value: 70, color: '#9b59b6' }
                                ].map((metric, index) => (
                                    <div key={index} className={styles.metricCard}>
                                        <div className={styles.metricHeader}>
                                            <span>{metric.title}</span>
                                            <span>{metric.value}%</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div 
                                                className={styles.progressFill} 
                                                style={{ 
                                                    width: `${metric.value}%`,
                                                    backgroundColor: metric.color
                                                }}>
                                            </div>
                                        </div>
                                        <div className={styles.legend}>
                                            <div className={styles.legendItem}>
                                                <div className={styles.legendDot} style={{ backgroundColor: metric.color }}></div>
                                                <span>Atingido</span>
                                            </div>
                                            <div className={styles.legendItem}>
                                                <div className={styles.legendDot} style={{ backgroundColor: '#eee' }}></div>
                                                <span>Restante</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }