import { useState, useEffect } from 'react'

const useScreenSize = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    //This function will break SRP
    //But it will be easier to handle the resizing later
    function handleScreenSize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        handleScreenSize();
        window.addEventListener('resize', handleScreenSize);

        return () => window.removeEventListener('resize', handleScreenSize);
    }, []);

    return [width, height];
}

export default useScreenSize