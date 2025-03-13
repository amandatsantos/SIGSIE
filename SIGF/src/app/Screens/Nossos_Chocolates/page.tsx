"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

export default function NossosChocolates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProductId, setExpandedProductId] = useState(null); // Estado para controlar o produto expandido
  const router = useRouter();

  const doces = [
    {
      id: 1,
      image: '/doces 1.png',
      title: 'Chocolates Veganos',
      description: 'Sabor sem culpa! Feito com ingredientes 100% vegetais, essa é a escolha ideal para uma experiência deliciosa e consciente.',
      macros: { calorias: 150, proteinas: 2, carboidratos: 20, gorduras: 8 },
      composicao: ['Cacau', 'Açúcar de Coco', 'Leite de Amêndoa'],
    },
    {
      id: 2,
      image: '/doces 2.png',
      title: 'Chocolates Amargos',
      description: 'Intenso e sofisticado! Esse bolo de chocolate amargo é perfeito para quem aprecia um sabor marcante e equilibrado.',
      macros: { calorias: 180, proteinas: 3, carboidratos: 15, gorduras: 10 },
      composicao: ['Cacau 70%', 'Açúcar Mascavo', 'Manteiga'],
    },
    {
      id: 3,
      image: '/doces 3.png',
      title: 'Chocolates Trufados',
      description: 'Puro luxo em cada pedaço! Um bolo irresistível com camadas de chocolate trufado para os verdadeiros chocólatras.',
      macros: { calorias: 200, proteinas: 4, carboidratos: 25, gorduras: 12 },
      composicao: ['Cacau', 'Creme de Leite', 'Açúcar'],
    },
    {
      id: 4,
      image: '/doces 4.png',
      title: 'Brigadeiro 70%',
      description: 'Guloseimas que desempenham um papel importante nas celebrações, especialmente em festas infantis.',
      macros: { calorias: 220, proteinas: 3, carboidratos: 30, gorduras: 14 },
      composicao: ['Cacau 70%', 'Leite Condensado', 'Manteiga'],
    },
    {
      id: 5,
      image: '/doces 5.png',
      title: 'Balas 50%',
      description: 'Coloridas e deliciosas, as balas de goma são sucesso garantido em qualquer festa!',
      macros: { calorias: 100, proteinas: 1, carboidratos: 25, gorduras: 0 },
      composicao: ['Açúcar', 'Gelatina', 'Corantes Naturais'],
    },
    {
      id: 6,
      image: '/doces 6.png',
      title: 'Biscoitos',
      description: 'Com uma combinação perfeita de crocância e recheio irresistível, esses biscoitos são um verdadeiro mimo para o paladar!',
      macros: { calorias: 180, proteinas: 2, carboidratos: 22, gorduras: 9 },
      composicao: ['Farinha de Trigo', 'Manteiga', 'Açúcar'],
    },
  ];

  const bolos = [
    {
      id: 7,
      image: '/bolos 1.png',
      title: 'Trufados',
      description: 'Uma explosão de sabor para os amantes de chocolate! Esse bolo de brigadeiro 70% cacau é pura tentação.',
      macros: { calorias: 250, proteinas: 5, carboidratos: 30, gorduras: 15 },
      composicao: ['Farinha de Trigo', 'Ovos', 'Chocolate 70%'],
    },
    {
      id: 8,
      image: '/bolos 2.png',
      title: 'Personalizados',
      description: 'Um bolo vibrante e cheio de personalidade! As frutas decoram essa delícia que encanta em qualquer ocasião.',
      macros: { calorias: 220, proteinas: 4, carboidratos: 28, gorduras: 14 },
      composicao: ['Farinha de Trigo', 'Ovos', 'Frutas Frescas'],
    },
    {
      id: 9,
      image: '/bolos 3.png',
      title: 'Tradicionais',
      description: 'Maciez e sabor em um só pedaço! Esse bolo tradicional é a escolha perfeita para acompanhar um café.',
      macros: { calorias: 210, proteinas: 3, carboidratos: 27, gorduras: 13 },
      composicao: ['Farinha de Trigo', 'Ovos', 'Leite'],
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleLoginClick = () => {
    router.push('/Screens/login');
  };

  const handleLogoClick = () => {
    router.push('/Screens/LandingPage');
  };

  const handleProductClick = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id); // Alterna a expansão do produto
  };

  const filterProducts = (products) => {
    return products.filter((produto) =>
      produto.title.toLowerCase().includes(searchTerm) ||
      produto.description.toLowerCase().includes(searchTerm)
    );
  };

  const filteredDoces = filterProducts(doces);
  const filteredBolos = filterProducts(bolos);

  return (
    <div className={styles.container} style={{ backgroundImage: "white", backgroundSize: '%', backgroundPosition: 'center', }}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src='/Logo 2.png' alt="Logo" />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>Nossos Chocolates</li>
            <li>Seja um Revendedor</li>
            <li>Trabalhe Conosco</li>
          </ul>
        </nav>
        <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <main className={styles.main}>
        <h1 className={styles.tituloSecao}>DOCES</h1>

        <div className={styles.produtosGrid}>
          {filteredDoces.map((produto) => (
            <div
              key={produto.id}
              className={`${styles.produtoCard} ${expandedProductId === produto.id ? styles.expanded : ''}`}
              onClick={() => handleProductClick(produto.id)}
            >
              <div className={styles.produtoImagemContainer}>
                <img src={produto.image} alt={produto.title} className={styles.produtoImagem} />
              </div>
              <div className={styles.produtoInfo}>
                <h3>{produto.title}</h3>
                <p>{produto.description}</p>
                {expandedProductId === produto.id && (
                  <div className={styles.produtoDetalhes}>
                    <h4>Macros (por 100g):</h4>
                    <ul>
                      <li>Calorias: {produto.macros.calorias}kcal</li>
                      <li>Proteínas: {produto.macros.proteinas}g</li>
                      <li>Carboidratos: {produto.macros.carboidratos}g</li>
                      <li>Gorduras: {produto.macros.gorduras}g</li>
                    </ul>
                    <h4>Composição:</h4>
                    <ul>
                      {produto.composicao.map((ingrediente, index) => (
                        <li key={index}>{ingrediente}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h1 className={styles.tituloSecao}>BOLOS</h1>

        <div className={styles.produtosGrid}>
          {filteredBolos.map((produto) => (
            <div
              key={produto.id}
              className={`${styles.produtoCard} ${expandedProductId === produto.id ? styles.expanded : ''}`}
              onClick={() => handleProductClick(produto.id)}
            >
              <div className={styles.produtoImagemContainer}>
                <img src={produto.image} alt={produto.title} className={styles.produtoImagem} />
              </div>
              <div className={styles.produtoInfo}>
                <h3>{produto.title}</h3>
                <p>{produto.description}</p>
                {expandedProductId === produto.id && (
                  <div className={styles.produtoDetalhes}>
                    <h4>Macros (por 100g):</h4>
                    <ul>
                      <li>Calorias: {produto.macros.calorias}kcal</li>
                      <li>Proteínas: {produto.macros.proteinas}g</li>
                      <li>Carboidratos: {produto.macros.carboidratos}g</li>
                      <li>Gorduras: {produto.macros.gorduras}g</li>
                    </ul>
                    <h4>Composição:</h4>
                    <ul>
                      {produto.composicao.map((ingrediente, index) => (
                        <li key={index}>{ingrediente}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.saibaMaisContainer}>
          <button className={styles.saibaMaisButton}>Saiba Mais</button>
        </div>
      </main>
    </div>
  );
}