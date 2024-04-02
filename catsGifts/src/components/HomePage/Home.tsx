import { useState, useEffect } from 'react';
import useScreenSize from '../../customHooks/useScreenSize';
import Header from '../Header/Header';
import RandomCatsImages from '../SectionOne/RandomCatsImages';
import "../../styles/Home.scss";

/*
    The porpouse of this function is to give name for the 
    root div class and based on that name to apply
    different style for: mobile, tablet and laptop/computer
*/

export function setRootClassNameBasedOnScreenSize(width: number, componentName: string) {
    if (width < 600) return `${componentName}-mobile-screen`;
    if (width > 600 && width <= 1100) return `${componentName}-tablet-screen`;
    if (width > 1100) return `${componentName}-large-screen`;
}

const Home = () => {
    const [rootClassName, setRootClassName] = useState<string>("");

    const [width] = useScreenSize();

    useEffect(() => {
        const rootClassName: any = setRootClassNameBasedOnScreenSize(width, "home");

        setRootClassName(rootClassName);
     
    }, [width])

    return (
        <div className={`${rootClassName}`}>
            <Header />

            <RandomCatsImages />
        </div>
    )
}

export default Home