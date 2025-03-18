'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const handleNossosChocolates = () => {
        router.push('/Screens/Nossos_Chocolates');
    };
    const handleDashboard = () => {
        router.push('/Screens/Dashboard');
    };
    const handleRelatorio = () => {
        router.push('/Screens/Relatorio');
    };
    const handleLogoClick = () => {
        router.push('/Screens/LandingPage');
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
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo} onClick={handleLogoClick}>
                    <img src='/Logo 2.png' alt="Logo" />
                </div>
                <nav className={styles.nav}>
                    <button className={styles.button} onClick={handleNossosChocolates}> Nossos Chocolates</button>
                    <button className={styles.button} onClick={handleDashboard}> Dashboard</button>
                    <button className={styles.button} onClick={handleRelatorio}> Relatórios</button>
                </nav>
            </header>
            <div className={styles.welcome}>
                Seja bem vindo !
            </div>
            <div className={styles.quadro}>
                <div className={styles.welcome}>
                    Dashboard
                </div >
                <div className={styles.title}>
                    Gerencie as métricas do sistema através de tabelas e gráficos, definindo meta para a empresa.
                    <div className={styles.modalHeader}>
                        <button className={styles.button2} onClick={handleMateria_Prima}>Materia Prima</button>
                        <button className={styles.button2} onClick={handleProdutos}>Produtos</button>
                        <button className={styles.button2} onClick={handleFornecedores}>Fornecedores</button>
                    </div>
                </div>
                <div className={styles.welcome}>
                    Metas
                    <div className={styles.title}>Defina as metas da empresa.</div>

                </div >
                <div className={styles.conta}>
                    {/* Meta de Produção */}
                    <div className={styles.card}>
                        <div className={styles.hea} id={styles.producao}>Meta de Produção</div>

                        <div><p>Quantidade de produtos:</p>
                            <input className={styles.input} type="text" placeholder='10.000' />
                            <button className={styles.editBtn}>Editar</button></div>
                        <div>

                            <p>Redução no desperdício:</p>
                            <input className={styles.input} type="text" placeholder='10%' />
                            <button className={styles.editBtn}>Editar</button>
                        </div>

                        <button className={styles.addBtn}>Adicionar</button>
                    </div>

                    {/* Meta de Vendas */}
                    <div className={styles.card}>
                        <div className={styles.hea} id={styles.vendas}>Meta de Vendas</div>
                        <div>
                            <p>Faturamento no mês:</p>
                            <input className={styles.input} type="text" placeholder='R$ 28.000,00' />
                            <button className={styles.editBtn}>Editar</button>
                        </div>
                        <div>
                            <p>Faturamento no ano:</p>
                            <input className={styles.input} type="text" placeholder='R$ 980.000,00' />
                            <button className={styles.editBtn}>Editar</button>
                        </div>


                        <button className={styles.addBtn}>Adicionar</button>
                    </div>

                    {/* Meta de Estoque */}
                    <div className={styles.card}>
                        <div className={styles.hea} id={styles.estoque}>Meta de Estoque</div>
                        <div>
                            <p>Quantidade no estoque:</p>
                            <input className={styles.input} type="text" placeholder='2086kg' />
                            <button className={styles.editBtn}>Editar</button>
                        </div>
                        <div>
                            <p>Limite do estoque:</p>
                            <input className={styles.input} type="text" placeholder='4000kg' />
                            <button className={styles.editBtn}>Editar</button>
                        </div>
                        <button className={styles.addBtn}>Adicionar</button>
                    </div>
                </div>
            </div>
        </div>


    )
}