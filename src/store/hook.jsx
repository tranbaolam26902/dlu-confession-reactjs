import { useState, useEffect } from 'react';
import { useContext } from 'react';
import Context from './Context';

// Hook for responsive
const useViewPort = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width };
};

// Hook for global states
const useStore = () => {
    const [states, dispatch] = useContext(Context);
    return [states, dispatch];
}

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken.token);
    }

    return {
        setToken: saveToken,
        token
    }
}

export { useViewPort, useStore, useToken };
