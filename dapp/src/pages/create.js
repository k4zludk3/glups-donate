import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState } from "react";
import { addCampaign, getLastCampaignId } from "../services/Web3Service";
import React from 'react';
import styles from '@/styles/teste.module.css';

export default function CreateCampaign() {
    const [Campaign, setCampaign] = useState({});
    const [message, setMessage] = useState("");

    function onInputChange(evt) {
        setCampaign(prevState => ({ ...prevState, [evt.target.id]: evt.target.value }));
    }

    function btnSaveClick() {
        setMessage("Salvando...aguarde...");
        addCampaign(Campaign)
        .then(tx => getLastCampaignId())
            .then(() => setMessage(`ONG cadastrada com sucesso! Utilize esse ID ${id} para receber as doações.`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    return (
        <>
            <Head>
                <title>Glups - Home</title>
                <meta name="description" content="Glups" />
            </Head>

            <main className={styles.main}>
                <div className={styles.sobreposicao}>

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
                    <div className="container">
                        <h1 className={styles.bannerText}>Cadastrar ONG</h1>
                        <p className={styles.bannerText}>Preencha os campos para incluir sua ONG na plataforma.</p>
                        <hr/>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <input type="text" id="nome" name="nome" className="form-control" value={Campaign.nome} onChange={onInputChange} />
                                <label htmlFor="nome">Nome da Organização:</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" id="causa" name="causa" className="form-control" value={Campaign.causa} onChange={onInputChange} />
                                <label htmlFor="causa">Causa:</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" id="cnpj" name="cnpj" className="form-control" value={Campaign.cnpj} onChange={onInputChange} />
                                <label htmlFor="cnpj">CNPJ:</label>
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <input type="button" className="btn btn-primary col-12 p-3" value="Salvar ONG" onClick={btnSaveClick} />
                        </div>
                        <div className="col-6 mb-3">
                            <Link href="/" className="btn btn-secondary col-12 p-3">Voltar</Link>
                        </div>
                        {
                            message
                                ? <div className="alert alert-success p-3 col-6" role="alert" dangerouslySetInnerHTML={{ __html: message }}></div>
                                : <></>
                        }
                    </div>
                </div>
            </main>
            </>
        );
}
