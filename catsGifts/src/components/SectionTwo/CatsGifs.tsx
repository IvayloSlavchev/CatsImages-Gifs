import { useState, useEffect } from 'react';
import useScreenSize from '../../customHooks/useScreenSize';
import Header from '../Header/Header';
import { setRootClassNameBasedOnScreenSize } from '../HomePage/Home';
import { websiteURL } from '../../App';
import "../../styles/CatsGifts.scss";

export function returnTheImageUsingFileReader(blob: any, setImages: any, catsGifsAndImages?: any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = () => {
        catsGifsAndImages.push(reader.result)
        setImages(catsGifsAndImages);
    };
}

const CatsGifs = () => {
    const [secondSectionClassName, setSecondSectionClassName] = useState<string>("");
    const [gifsImages, setGifsImages] = useState<any>([]);
    const [fetchImagesTime, setFetchImagesTime] = useState<number>(0);

    const [width] = useScreenSize();

    const catsGifsAndImages: any = [];
    const getGifsWithText: string[] = ["Hello", "World", "!"]

    //Here we will define three different functions
    //That will render gifs with different text on them
    async function getGifWithHelloText(catWord: string) {
        const getHelloGifRequest = await fetch(`${websiteURL}/cat/says/${catWord}?fontColor=white&fontSize=90`);
        const getHelloGifResponse = await getHelloGifRequest.blob();

        returnTheImageUsingFileReader(getHelloGifResponse, setGifsImages, catsGifsAndImages);

    }

    useEffect(() => {
        (async () => {
            /*
                This variable will get every word from the array
                based on it's index
            */
            let index: number = 0;

            while (gifsImages.length < 3) {
                await getGifWithHelloText(getGifsWithText[index]);
                index++;

                setFetchImagesTime(oldCount => oldCount + 1);

                if (index === 3) return;
            }

            if (gifsImages.length < 3) {
                await getGifWithHelloText(getGifsWithText[index]);
                index++;
            }
        })();

        const secondSectionName: any = setRootClassNameBasedOnScreenSize(width, 'second-section');

        setSecondSectionClassName(secondSectionName);

    }, [width]);

    return (
        <div className={`${secondSectionClassName}`}>
            <Header />
            <div className='random-gifs-class'>
                {gifsImages.length >= 3 ? gifsImages.map((item: any, index: number) => <img src={item} className='random-cat-gif' key={index} />) : <div className='loading-class-span'>
                    <span className='loading-text-span'>Loading...</span>

                    {fetchImagesTime >= 5 ? <div className='refresh-class'>
                        <span className='waiting-too-long-span'>Waiting too long?</span>
                        <button className='refresh-button' onClick={() => window.location.reload()}>Refresh</button>
                    </div>
                        : null}
                </div>}
            </div>
        </div>
    )
}

export default CatsGifs