import { useState, useEffect } from "react";
import { setRootClassNameBasedOnScreenSize } from "../HomePage/Home";
import useScreenSize from "../../customHooks/useScreenSize";
import { Link } from "react-router-dom";
import "../../styles/Header.scss";

const Header = () => {
    const [rootHeaderClassName, setRootHeaderClassName] = useState<string>("");

    const [width] = useScreenSize();

    useEffect(() => {
        const headerRootClassName: any = setRootClassNameBasedOnScreenSize(width, "header");

        setRootHeaderClassName(headerRootClassName);
    }, [width])

    return (
        <header className={`${rootHeaderClassName}`}>
            <div className="website-name-class">
                <h1 className="website-header">Cats Gifs & Images</h1>
            </div>

            <div className="section-options-class">
                <Link className="header-links" to="/">Section 1</Link>
                <Link className="header-links" to="/catsgifs">Section 2</Link>
                <Link className="header-links" to="/blurimage">Section 3</Link>
                <Link className="header-links" to="/rgbinput">Section 4</Link>
            </div>
        </header>
    )
}

export default Header