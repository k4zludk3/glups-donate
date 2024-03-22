import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState } from "react";
import { addOng } from "../services/Web3Service"; // Asumindo que você tem uma função addOng em seus serviços

export default function CreateOng() {
    const [ong, setOng] = useState({ nome: '', causa: '', cnpj: '' });
    const [message, setMessage] = useState("");

    function onInputChange(evt) {
        setOng(prevState => ({ ...prevState, [evt.target.name]: evt.target.value }));
    }

    function btnSaveClick() {
        setMessage("Salvando...aguarde...");
        addOng(ong)
            .then(() => setMessage(`ONG ${ong.nome} cadastrada com sucesso!`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    return (
        <>
            <Head>
                <title>GLUPS | Cadastrar ONG</title>
                <meta charSet='utf-8' />
                <meta name="description" content="Cadastre sua ONG na plataforma GLUPS e ajude a fazer a diferença." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Cadastrar ONG</h1>
                <p>Preencha os campos para incluir sua ONG na plataforma.</p>
                <hr className="mb-4" />
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" id="nome" name="nome" className="form-control" value={ong.nome} onChange={onInputChange} />
                        <label htmlFor="nome">Nome da Organização:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" id="causa" name="causa" className="form-control" value={ong.causa} onChange={onInputChange} />
                        <label htmlFor="causa">Causa:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" id="cnpj" name="cnpj" className="form-control" value={ong.cnpj} onChange={onInputChange} />
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
                <Footer />
            </div>
        </>
    );
}
