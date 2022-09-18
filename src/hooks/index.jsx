import { useState, useEffect } from "react";

const useViewPort = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width };
};

export default useViewPort;