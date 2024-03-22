import React from 'react';
import Head from 'next/head';
import styles from '@/styles/teste.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { doLogin } from '@/services/Web3Service';


export default function inicio() {

  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  function btnLoginClick() {
    doLogin()
      .then(wallet => setWallet(wallet))
      .catch(err => setError(err.message));
  }
  return (
    <>
      <Head>
        <title>Glups - Home</title>
        <meta name="description" content="Glups" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>Glups</div>
          <div className={styles.navItems}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/about" className={styles.navLink}>Sobre</a>
            <a href="/create" className={styles.navLink}>Cadatrar ONG</a>
            <a href="/donate" className={styles.navLink}>Doar</a>
          </div>
        </nav>
      </header>


      <main className={styles.main}>
        <div className={styles.sobreposicao}>
          <div className={styles.banner}>
            <h1>Ajudando ONGS e doadores</h1>
            <h4>O objetivo da nossa plataforma é a transparência</h4>
            <h5 className={styles.h5}>
              1° Passo: Conecte-se na MetaMask <br>
              </br>
              2° Passo: Receba ou faça doações
            </h5>
            {
              !wallet
                ? (
                  <div>
                    <button type='button' className={styles.donateButton} onClick={btnLoginClick}>
                      <img src="/metamask.svg" width="64" className="me-3" />
                      Conectar com a MetaMask
                    </button>
                    {
                      error
                        ? <div className="alert alert-danger p-3 col-6" role="alert">{error}</div>
                        : <></>
                    }
                  </div>
                )
                : (
                  <div>
                    <p>Seja bem vindo {wallet}</p>
                    <p>O que você deseja fazer?</p>
                    <button type='button' className={styles.donateB} onClick={btnLoginClick}>
                      <a className={styles.donateButton2} href="/donate">Doar</a>
                      <br /><br />
                      <a className={styles.donateButton2} href="/create">Cadatrar ONG</a>
                    </button>
                  </div>
                )
            }
          </div>
        </div>
      </main>
    </>
  );
};

