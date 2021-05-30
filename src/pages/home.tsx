import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '../api/api';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  noToken: boolean;
  name: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function App(props: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    if(props.noToken){
      router.push('/');
    }
  }, [props.noToken]);

  return (
    <ChallengesProvider 
      name={props.name}
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
      </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if(token === 'undefined') {
    Cookies.remove('token');

    return {
      props: {
        noToken: true
      }
    }
  }

  api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

  const user = await api.get('/profile').then(({data}) => {
    delete data.password;

    return data;
  })

  return {
    props: {
      name: String(user.name),
      level: Number(user.level),
      currentExperience: Number(user.currentExperience),
      challengesCompleted: Number(user.challengesCompleted),
    }
  }
}
