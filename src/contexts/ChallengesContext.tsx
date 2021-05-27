import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { api } from '../api/api';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    name: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallange: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    name: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [name, setName] = useState(rest.name ?? 'Usuário');
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesComplete] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        api.put('/users', {
            level,
            currentExperience,
            challengesCompleted
        }).catch(err => {
            console.log(err);
        });
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallange() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperencience = currentExperience + amount;

        if (finalExperencience >= experienceToNextLevel) {
            finalExperencience = finalExperencience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperencience);
        setActiveChallenge(null);
        setChallengesComplete(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                name,
                level, 
                currentExperience, 
                challengesCompleted, 
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallange,
                closeLevelUpModal,
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    ); 
}