import { useState, useEffect, ChangeEvent } from 'react';
import { setRootClassNameBasedOnScreenSize } from '../HomePage/Home';
import useScreenSize from '../../customHooks/useScreenSize';
import { websiteURL } from '../../App';
import Header from '../Header/Header';
import "../../styles/RGBImage.scss";

const RGBImage = () => {
    const [rootClassName, setRootClassName] = useState<string>("");
    const [valueForRed, setValueForRed] = useState<number>(23);
    const [valueForGreen, setValueForGreen] = useState<number>(87);
    const [valueForBlue, setValueForBlue] = useState<number>(53);


    const [getImage, setGetImage] = useState<any>(null);

    const [width] = useScreenSize();

    function returnTheImageUsingFileReader(blob: any) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = () => {
            setGetImage(reader.result);
        };
    }


    async function getImageWithGivenRGBValues() {

        const getImageWithDifferentRGBValues = await fetch(`${websiteURL}/cat?filter=custom&r=${valueForRed}&g=${valueForGreen}&b=${valueForBlue}&width=900&height=900`);
        const getImageResponse = await getImageWithDifferentRGBValues.blob();

        returnTheImageUsingFileReader(getImageResponse);
    }

    useEffect(() => {
        (async() => {
            await getImageWithGivenRGBValues()
        })();

        const assignRootClassName: any = setRootClassNameBasedOnScreenSize(width, "section-four");

        setRootClassName(assignRootClassName);
    }, [width]);

    return (
        <div className={rootClassName}>
            <Header />
           
           <div className='image-and-inputs-class'>
                <div className="image-based-on-input-class">
                    { getImage === null ? <span className='loading-text'>Loading...</span> : <img src={getImage} alt="Random Cat Image" className='random-cat-image' /> }
                </div>

                <div className="straight-line"></div>

                <div className='rgb-input-class'>
                    <span className='section-title'>
                        Give random values in the input fields down and see image color changing.
                    </span>

                    <input 
                        type="number" 
                        placeholder='Blue Value'
                        className='rgb-input-field'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValueForBlue(Number(event.target.value))}    
                    />
                    <input 
                        type="number" 
                        placeholder='Red Value'
                        className='rgb-input-field'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValueForRed(Number(event.target.value))}    
                    />
                    <input 
                        type="number" 
                        placeholder='Green Value'
                        className='rgb-input-field'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValueForGreen(Number(event.target.value))}    
                    />

                    <button className='get-rgb-image-button' onClick={() => getImageWithGivenRGBValues()}>Get Image</button>
                </div>
           </div>
        </div>
    )
}

export default RGBImage