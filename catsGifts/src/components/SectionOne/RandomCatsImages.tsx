import { useState, useEffect } from 'react';
import useScreenSize from '../../customHooks/useScreenSize';
import { setRootClassNameBasedOnScreenSize } from '../HomePage/Home';
import { websiteURL } from '../../App';
import { returnTheImageUsingFileReader } from '../SectionTwo/CatsGifs';
import "../../styles/RandomCatsImages.scss"

const RandomCatsImages = () => {
    const [rootClassName, setRootClassName] = useState<string>("");
    const [catsImages, setCatsImages] = useState<any[]>([]);

    const [width] = useScreenSize();

    async function getTenRandomCatsImages() {
        //Because we have to make 10 requests in order to get 10 images
        //We are going to use while loop in order to be sure that we will get 10 images

        const listOfImages: any = [];

        while (listOfImages.length < 10) {
            const getCatsImagesRequest = await fetch(`${websiteURL}/cat?width=200&height=200`);
            const blob = await getCatsImagesRequest.blob();

            returnTheImageUsingFileReader(blob, setCatsImages, listOfImages);
        }
    }

    useEffect(() => {
        (async () => {
             await getTenRandomCatsImages();
        })();

        const setSectionOneClassName: any = setRootClassNameBasedOnScreenSize(width, "section-one");

        setRootClassName(setSectionOneClassName);
    }, [width]);

    return (
        <div className={`${rootClassName}`}>
            <h1 className='page-title'>Section 1 - 10 random cat images</h1>

            <div className='cat-images-class'>
                { catsImages.length >= 10 ? catsImages.map((item: any, index) => <img src={item} alt="Cat image" key={index} className='cat-image' />) : <div className='loading-text-class'>
                    <span className='loading-text-span'>Loading...</span>
                </div>}
            </div>
        </div>
    )
}

export default RandomCatsImages