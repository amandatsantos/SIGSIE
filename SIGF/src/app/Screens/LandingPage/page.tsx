"use client";

import React, { useState, useEffect } from "react";
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './page.module.css';
import SearchIcon from '@mui/icons-material/Search';

register();

export default function Home() {
  const [slidesPerView, setSlidesPerView] = useState(1); // Inicialmente, 1 slide por visualização

  const carouselImages = [
    '/Carrossel 1.png',
    '/Carrossel 2.png',
    '/Carrossel 3.png',
    '/Carrossel 4.png'
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidesPerView(1); // 1 slide em telas pequenas
      } else {
        setSlidesPerView(1); // Ajuste para 1 slide em telas maiores (ou mais, se necessário)
      }
    }

    handleResize(); // Verifica o tamanho da tela ao carregar
    window.addEventListener("resize", handleResize); // Atualiza ao redimensionar

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o listener
    };
  }, []);

  return (
    <div className={styles.container} style={{ backgroundImage: "url('/Background.png')", backgroundSize: 'cover' }}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src='/Logo 2.png' alt="Logo" />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>Nossos Chocolates</li>
            <li>Seja um Revendedor</li>
            <li>Trabalhe Conosco</li>
          </ul>
        </nav>
        <button className={styles.loginButton}>Login</button>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar"
            className={styles.searchInput}
          />
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.hero}>
          <Swiper
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={10}
            autoplay={{ delay: 3000 }} // Adiciona autoplay com intervalo de 3 segundos
            loop={true} // Habilita o loop infinito
            className={styles.customSwiper}
          >
            {carouselImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Carrossel ${index + 1}`}
                  className={styles.carouselImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
    </div>
  );
}