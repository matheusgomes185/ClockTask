import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../api/api';

interface AuthContextData {
    isLoggedIn: boolean;
    handleLogin(email: string, password: string): void;
    handleLogout(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
  
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setIsLoggedIn(true);
        }
    }, []);

    async function handleLogin(email: string, password: string) {
        await api.post('/auth', {
            email,
            password
        }).then( ({ data:{ token } }) => {            
            Cookies.set('token', JSON.stringify(token), { expires: 1 });
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            setIsLoggedIn(true);
        }).catch((err) => {
            alert("E-mail ou senha inválidos!");
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
            handleLogout
        }}>
            { children }
        </AuthContext.Provider>
    )
}