import { useState, useEffect, useRef } from 'react';
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
};

// Hook for token
const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
        window.location.reload();
    };

    const removeToken = () => {
        localStorage.removeItem('token');
        window.location.assign('/');
    };

    return {
        setToken: saveToken,
        token,
        removeToken,
    };
};

const useFilter = () => {
    const getFilter = () => JSON.parse(localStorage.getItem('filter'));

    const [filter, setFilter] = useState(getFilter());

    const saveFilter = (filter) => {
        localStorage.setItem('filter', JSON.stringify(filter));
        setFilter(filter);
    };

    const removeFilter = () => {
        localStorage.removeItem('filter');
    };

    return {
        setFilter: saveFilter,
        filter,
        removeFilter,
    };
};

const useFocusInput = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
};

export { useViewPort, useStore, useToken, useFilter, useFocusInput };
