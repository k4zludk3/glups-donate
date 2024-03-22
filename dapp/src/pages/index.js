import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { doLogin } from '@/services/Web3Service';

export default function Home() {

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
        <title>GLUPS | Home</title>
        <meta charSet='utf-8' />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center py-5 g-5">
          {
            !wallet
              ? (
                <div className="col-10 col-sm-8 col-lg-6">
                  <img src="https://cdn.discordapp.com/attachments/1220135642093195294/1220533597350658130/principal.png?ex=660f497e&is=65fcd47e&hm=a6b1a1d9be3ef97362f47c528dec36719184e4a87a0e7a258b4b7c04ac123ea2&" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
                </div>
              )
              : (
                <div className="col-10 col-sm-8 col-lg-6">
                  <p className='mb-3'>Seja bem vindo {wallet}</p>
                  <p className='mb-3'>O que você deseja fazer?</p>
                  <div className='col-12'>
                    <p><Link href="/donate" className='btn btn-primary col-6 p-3'>Quero fazer uma doação</Link></p>
                    <p><Link href="/create" className='btn btn-secondary col-6 p-3'>Quero criar uma campanha</Link></p>
                  </div>
                </div>
              )
          }

          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">GLUPS</h1>
            <p className='lead'>Uma plataforma descentralizada de doações.</p>
            <h3>1°Passo:</h3>
            <p className='lead mb-3'>Conecte sua carteira</p>
            <h3>2°Passo:</h3>
            <p className='lead mb-3'>Cadastre sua ONG ou seja um doador<br></br></p>
            {
              !wallet
                ? (
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type='button' className='btn btn-primary btn-lg px-4 me-md-2' onClick={btnLoginClick}>
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
                : <></>
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
