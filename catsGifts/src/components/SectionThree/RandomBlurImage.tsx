import { useState, useEffect } from 'react';
import useScreenSize from '../../customHooks/useScreenSize';
import { setRootClassNameBasedOnScreenSize } from '../HomePage/Home';
import Header from '../Header/Header';
import { websiteURL } from '../../App';
import "../../styles/RandomBlurImage.scss";
const RandomBlurImage = () => {
    const [rootClassName, setRootClassName] = useState<string>("");
    const [randomImageWithBlurEffect, setRandomImageWithBlurEffect] = useState<any>(null);

    const [width] = useScreenSize();

    function generateRandomValueForBluredImage() {
        return Math.floor(Math.random() * 255);
    }

    function returnTheImageUsingFileReader(blob: any, setImages: any) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
    
        reader.onloadend = () => {
            setImages(reader.result);
        };
    }

    async function getImageWithRandomBlur() {
        const RANDOM_VALUE = generateRandomValueForBluredImage();

        const getImageWithRandomBlurRequest = await fetch(`${websiteURL}/cat?blur=${RANDOM_VALUE}&width=400&height=400`);
        const getImageResponse = await getImageWithRandomBlurRequest.blob();

        returnTheImageUsingFileReader(getImageResponse, setRandomImageWithBlurEffect);
    }

    useEffect(() => {

        (async () => {
            await getImageWithRandomBlur();
        })()

        const setSectionOneClassName: any = setRootClassNameBasedOnScreenSize(width, "section-three");

        setRootClassName(setSectionOneClassName);
    }, [width])
    return (
        <div className={rootClassName}>
            <Header />
            
            <div className='random-image-with-blur-class'>
                {randomImageWithBlurEffect === null ?
                 <span className='loading-span'>Loading...</span> : 
                    <img src={randomImageWithBlurEffect} alt='Random Cat Image' className='random-cat-image' />
                 }

                <button className='random-image-button' onClick={() => getImageWithRandomBlur()}>Get Image With Random Blur</button>
            </div>
        </div>
    )
}

export default RandomBlurImage