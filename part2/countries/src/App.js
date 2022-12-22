import {useState, useEffect} from "react";
import axios from "axios";
import OneCountry from "./components/OneCountry";
import ManyCountries from "./components/ManyCountries";

function App() {
    const [countries, setCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState('')
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => setCountries(response.data))
    }, [])
    const handleFilterCountryChanged = (event) => setFilterCountries(event.target.value)

    const filteredCountries = filterCountries.length > 0 ? countries.filter(c => c.name.common.toLowerCase().includes(filterCountries.toLowerCase())) : countries
    const size = filteredCountries.length;
    return (
        <div>
            find countries : <input value={filterCountries} onChange={handleFilterCountryChanged}/>

            {size === 1 && <OneCountry country={filteredCountries[0]}/>}
            {size > 1 && size <= 10 && <ManyCountries data={filteredCountries}/>}
            {size > 10 && <p>Too many matches, specify another filter</p>}
        </div>
    );
}

export default App;
