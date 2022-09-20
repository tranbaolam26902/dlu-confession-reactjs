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

export { useViewPort, useStore };
