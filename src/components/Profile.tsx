import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export function Profile() {
    const { handleLogout } = useContext(AuthContext);
    const { name, level } = useContext(ChallengesContext);
    const router = useRouter();

    function logout() {
        handleLogout();
        router.push('/');
    }
    
    return(
        <div className={styles.profileContainer}>
            <img src="http://clocktask.s3-website-us-east-1.amazonaws.com/default-user-image.png" alt="{nameUser}" />
            <div>
                <strong>{name} <button onClick={logout}><img src="http://clocktask.s3-website-us-east-1.amazonaws.com/icons/arrowright.svg" alt="Sair" /> Sair</button></strong>
                <p>
                    <img src="http://clocktask.s3-website-us-east-1.amazonaws.com/icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}