import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '../api/api';
import { delay } from '../lib/delay';
import styles from '../styles/pages/Register.module.css';

export default function Register() {
  const router = useRouter();  
  
  const [erroMessage, setErroMessage] = useState(null);

  const registerUser = async (event) => {
    event.preventDefault();
    
      await api.post('/users', {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.name.value,
        username: event.target.name.value.toLowerCase().trim()
      }).then( ({data:{error}}) => {
        if(!error) {
          setErroMessage(['success', 'Conta criada com sucesso. Faça o login para continuar ou aguarde 5 segundos.']);
          delay(5000).then(()=>{
            router.push('/');
          });
        } else {
          setErroMessage(['error', 'E-mail já existe!']);
        }
      }).catch(err => {
        setErroMessage(['error', 'Ocorreu um erro inesperado, por favor conectate um administrador.']);
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <section></section>
      <section>
        <div>
          <header>Cadastro</header>
          <p>Faça o cadastro para começar a sua jornada</p>

          {erroMessage && <div id="message" data-message={erroMessage[0]}>{erroMessage[1]}</div>}
          <form className={styles.form} onSubmit={registerUser}>
            <input id="name" type="text" autoComplete="name" placeholder="Digite seu nome" required />
            <input id="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
            <input id="password" type="password" autoComplete="password" placeholder="Digite sua senha" required />
            <button type="submit">
              <img src="http://clocktask.s3-website-us-east-1.amazonaws.com/icons/arrowright.svg" alt="Cadastrar" />
              Cadastrar
            </button>
          </form>
          
          <button className={styles.linkButton} onClick={ ()=>{router.push('/')} }>
            Fazer login
          </button>
        </div>
      </section>
    </div>
  );
}