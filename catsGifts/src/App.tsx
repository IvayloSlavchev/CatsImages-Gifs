import { Routes, Route } from 'react-router-dom';

import Home from "./components/HomePage/Home"
import CatsGifs from './components/SectionTwo/CatsGifs';
import RGBImage from './components/SectionFour/RGBImage';
import RandomBlurImage from './components/SectionThree/RandomBlurImage';

//I set the API link here in order
//to not write it every time but just change the endpoint
export const websiteURL: string = 'https://cataas.com';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catsgifs" element={<CatsGifs />} />
                <Route path="/rgbinput" element={<RGBImage />} />
                <Route path="/blurimage" element={<RandomBlurImage />} />
            </Routes>
        </div>
    )
}

export default App
