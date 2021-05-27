import { useEffect } from 'react';
import { api } from '../api/api';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
      const token = localStorage.getItem('token');

      if(token) {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
  }, []);

  return (    
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
