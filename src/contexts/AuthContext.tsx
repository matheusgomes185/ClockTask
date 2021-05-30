import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../api/api';

interface AuthContextData {
    isLoggedIn: boolean;
    erroMessage: string;
    handleLogin(email: string, password: string): void;
    handleLogout(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [erroMessage, setErroMessage] = useState('');
    
    const token = Cookies.get('token');

    useEffect(() => {
        if(token !== 'undefined') {
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
    }, [token]);

    async function handleLogin(email: string, password: string) {
        await api.post('/auth', {
            email,
            password
        }).then( ({ data:{user, token, error} }) => { 
            if(user) {
                Cookies.set('token', JSON.stringify(token), { expires: 1 });
                api.defaults.headers.Authorization = `Bearer ${token}`;
                setIsLoggedIn(true);
                setErroMessage('');
            } else {
                setErroMessage('E-mail ou senha inválido!');
            }
        }).catch((err) => {
            setErroMessage("Ocorreu o erro inesperado, contacte o administrador!");
            console.log(err);
        });
    }

    async function handleLogout() {
        setIsLoggedIn(false);
        Cookies.remove('token');
        api.defaults.headers.Authorization = undefined;
    }
    
    return(
        <AuthContext.Provider value={{
            isLoggedIn,
            handleLogin,
            handleLogout,
            erroMessage
        }}>
            { children }
        </AuthContext.Provider>
    )
}