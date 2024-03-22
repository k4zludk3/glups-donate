import Head from "next/head"; // Componente Head do Next.js para modificar o <head> do HTML
import Link from "next/link"; // Componente para navegação de rota interna
import Footer from "@/components/Footer"; // Componente personalizado de rodapé
import { useState } from "react"; // Hook useState do React para gerenciamento de estado
import { getCampaign, donate } from "../services/Web3Service"; // Funções de serviço para interagir com contratos inteligentes
import styles from '@/styles/teste.module.css';

export default function Donate() {

    const [campaign, setCampaign] = useState({}); // Estados para gerenciar as informações da campanha, valor da doação e mensagens de feedback
    const [donation, setDonation] = useState(0);
    const [message, setMessage] = useState("");

    // Função para atualizar o ID da campanha com base na entrada do usuário
    function onChangeId(evt) {
        campaign.id = evt.target.value;
    }

    // Função para buscar detalhes de uma campanha usando o ID fornecido
    function btnSearchClick() {
        setMessage("Buscando...aguarde..."); // Define uma mensagem temporária de busca
        getCampaign(campaign.id) // Chama a função de serviço para buscar a campanha
            .then(result => {
                setMessage(""); // Limpa a mensagem após a busca
                result.id = campaign.id; // Garante que o ID está incluído nos dados da campanha
                setCampaign(result); // Atualiza o estado com os detalhes da campanha
            })
            .catch(err => setMessage(err.message)); // Define a mensagem de erro em caso de falha
    }

    // Função para atualizar o valor da doação com base na entrada do usuário
    function onChangeValue(evt) {
        setDonation(evt.target.value);
    }

    // Função para realizar uma doação para a campanha atual
    function btnDonateClick() {
        setMessage("Doando...aguarde...");
        donate(campaign.id, donation)
            .then(tx => setMessage(`Doação realizada. Em alguns minutos o saldo será atualizado.`))
            .catch(err => setMessage(err.message));
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
                        <h1 className={styles.bannerText}>Donate Crypto</h1>
                        {
                            !campaign.id
                                ? (
                                    <>
                                        <p className="mb-5">
                                            Qual é a chave da ONG que procura?
                                        </p>
                                        <div className="col-3">
                                            <div className="input-group mb-3">
                                                <input type="number" id="campaignId" className="form-control" onChange={onChangeId} value={campaign.id} />
                                                <input type="button" value="Buscar" className="btn btn-primary p-3" onClick={btnSearchClick} />
                                            </div>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <p>Verifique se esta é a campanha certa antes de finalizar sua doação.</p>
                                        <hr/>
                                        <div className="row flex-lg-row-reverse align-items-center g-5">
                                            <div className="col-5 mb-5" style={{ height: 480, scrollbars: true }}>
                                                    <div className="mb-3">
                                                    <div className="input-group">
                                                        <input type="number" id="donation" className="form-control" onChange={onChangeValue} value={donation} />
                                                        <span className="input-group-text">$UPS</span>
                                                        <input type="button" value="Doar" className="btn btn-primary p-3 w-25" onClick={btnDonateClick} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                        }
                        {
                            message
                                ? <div className="alert alert-success p-3 col-6" role="alert">{message}</div>
                                : <></>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}