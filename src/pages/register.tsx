import { useRouter } from 'next/router';
import styles from '../styles/pages/Register.module.css';
import { api } from '../api/api';

export default function Register() {
  const router = useRouter();
  const { isFallback } = useRouter();

  if(isFallback){
    return <h1>Carregando...</h1>
  }

  const registerUser = async (event) => {
    event.preventDefault();
    
      await api.post('/users', {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.name.value,
        username: event.target.name.value.toLowerCase().trim()
      }).then((response) => {
        if(response.status === 201) {
          alert ("Conta criada com sucesso, clique em OK para continuar.");
          router.push('/');
        } else {
          alert ("Ocorreu um erro ao tentar criar conta, tente novamente mais tarde.");
        }
      }).catch(err => {
        alert("Ocorreu um erro inesperado, por favor conectate um administrador.");
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

          <form className={styles.form} onSubmit={registerUser}>
            <input id="name" type="text" autoComplete="name" placeholder="Digite seu nome" required />
            <input id="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
            <input id="password" type="password" autoComplete="password" placeholder="Digite sua senha" required />
            <button type="submit">
              <img src="/icons/arrowright.svg" alt="Cadastrar" />
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