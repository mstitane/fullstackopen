import OneCountry from "./OneCountry";
import {useState} from "react";

const ManyCountries = (props) => {
    const [show, setShow] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState({})
    const handleShowClick = (country) => {
        setShow(!show)
        setSelectedCountry(country)
    }

    return (
        <div>
            {show === true && <OneCountry country={selectedCountry}/>}
            {show === false && props.data.map((c) =>
                <p key={c.name.common}>{c.name.common}
                    <button onClick={() => handleShowClick(c)}> show</button>
                </p>
            )}
        </div>
    )
}

export default ManyCountries