"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Relatorios() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({
    vendas: 0,
    faturamento: 0,
    estoque: 0,
    producao: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://localhost:5665/relatorios/relatorio');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    }
  };

  const handleInsertVendas = async (value) => {
    try {
      const response = await fetch('http://localhost:5665/relatorios/update_vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metric: 'vendas', value }),
      });
      if (response.ok) {
        fetchMetrics(); // Atualiza as métricas após a inserção
      } else {
        console.error('Erro ao inserir dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
  };

  const handleInsertFaturamento = async (value) => {
    try {
      const response = await fetch('http://localhost:5665/relatorios/update_faturamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metric: 'faturamentoTotal', value }),
      });
      if (response.ok) {
        fetchMetrics(); // Atualiza as métricas após a inserção
      } else {
        console.error('Erro ao inserir dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
  };

  const handleInsertEstoque = async (value) => {
    try {
      const response = await fetch('http://localhost:5665/relatorios/update_estoque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metric: 'estoque', value }),
      });
      if (response.ok) {
        fetchMetrics(); // Atualiza as métricas após a inserção
      } else {
        console.error('Erro ao inserir dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
  };

  const handleInsertProducao = async (value) => {
    try {
      const response = await fetch('http://localhost:5665/relatorios/update_producao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metric: 'producao', value }),
      });
      if (response.ok) {
        fetchMetrics(); // Atualiza as métricas após a inserção
      } else {
        console.error('Erro ao inserir dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
    }
  };

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
    <div>
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
      <div className={styles.containerRelatorio}>
        {/* Título */}
        <div className={styles.reportTitle}>Relatórios</div>

        {/* Quadrados de Métricas */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Vendas</p>
            <p className={`${styles.metricValue} ${styles.pink}`}>{metrics.vendas}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Faturamento total</p>
            <p className={`${styles.metricValue} ${styles.green}`}>{metrics.faturamento}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Estoque</p>
            <p className={`${styles.metricValue} ${styles.purple}`}>{metrics.estoque}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Produção</p>
            <p className={`${styles.metricValue} ${styles.orange}`}>{metrics.producao}</p>
          </div>
        </div>

        {/* Inputs para os quadrados */}
        <div className={styles.inputsGrid}>
          <div className={styles.inputGroup}>
            <input type="text" id="vendasInput" placeholder="Vendas" className={styles.inputBox} />
            <button className={styles.submitButton} onClick={() => handleInsertVendas(document.getElementById('vendasInput').value)}>Enviar</button>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" id="faturamentoInput" placeholder="Faturamento" className={styles.inputBox} />
            <button className={styles.submitButton} onClick={() => handleInsertFaturamento(document.getElementById('faturamentoInput').value)}>Enviar</button>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" id="estoqueInput" placeholder="Estoque" className={styles.inputBox} />
            <button className={styles.submitButton} onClick={() => handleInsertEstoque(document.getElementById('estoqueInput').value)}>Enviar</button>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" id="producaoInput" placeholder="Produção" className={styles.inputBox} />
            <button className={styles.submitButton} onClick={() => handleInsertProducao(document.getElementById('producaoInput').value)}>Enviar</button>
          </div>
        </div>

        {/* Relatório Mensal */}
        <div className={styles.reportTitle}>Relatório Mensal</div>
        <div className={styles.reportGrid}>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Estoque mensal</p>
            <p className={`${styles.metricValue} ${styles.purple}`}>{metrics.estoque}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Vendas mensais</p>
            <p className={`${styles.metricValue} ${styles.pink}`}>{metrics.vendas}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Produção mensal</p>
            <p className={`${styles.metricValue} ${styles.purple}`}>{metrics.producao}</p>
          </div>
          <div className={styles.metricBox}>
            <p className={styles.metricLabel}>Faturamento</p>
            <p className={`${styles.metricValue} ${styles.green}`}>{metrics.faturamento}</p>
          </div>
        </div>
      </div>
    </div>
  );
}