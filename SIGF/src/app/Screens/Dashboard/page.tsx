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
                </div>
                <div className={styles.title}>
                    Gerencie as métricas do sistema através de tabelas e gráficos, definindo meta para a empresa.

                    <button className={styles.button2} onClick={handleMateria_Prima}>Materia Prima</button>
                    <button className={styles.button2} onClick={handleProdutos}>Produtos</button>
                    <button className={styles.button2} onClick={handleFornecedores}>Fornecedores</button>
                </div>
            </div>
        </div>


    )
}