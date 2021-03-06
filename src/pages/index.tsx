import { useRouter } from 'next/router';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/pages/Login.module.css';


export default function Login() {
  const { isLoggedIn, handleLogin, erroMessage } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn) {
      router.push('/home');
    }
  }, [isLoggedIn]);

  const login = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value

    handleLogin(email, password);
  }

  return (
    <div className={styles.container}>
       <Head>
        <title>Login</title>
      </Head>

      <section></section>
      <section>
        <div>
          <header>Bem-vindo</header>
          <p>Faça o login para começar</p>
          
          {erroMessage && <div id="message" data-message="error">{erroMessage}</div>}
          <form className={styles.form} onSubmit={login}>
            <input id="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
            <input id="password" type="password" autoComplete="password" placeholder="Digite sua senha" required />
            <button type="submit">
              <img src="http://clocktask.s3-website-us-east-1.amazonaws.com/icons/arrowright.svg" alt="Entrar" />
            </button>
          </form>
          <button className={styles.linkButton} type="button" onClick={ ()=>{router.push('register')} }>
            Cadastre-se
          </button>
        </div>
      </section>
    </div>
  );
}