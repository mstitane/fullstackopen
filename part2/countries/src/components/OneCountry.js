import {useEffect, useState} from "react";
import axios from "axios";

const OneCountry = (props) => {
    const country = props.country;
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const latlng = country.capitalInfo.latlng
        axios
            .get("https://api.openweathermap.org/data/2.5/weather?",
                { params: { lat: latlng[0] ,lon: latlng[1] ,appid: api_key, units : "metric"} })
            .then(response => {
                let res = response.data
                let newWeather = {
                    temperature : res.main.temp + " Celsius",
                    wind: res.wind.speed + " m/s",
                    iconUrl: "https://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png"
                }
                setWeather(newWeather);
            })
    }, [country])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital : {country.capital[0]}</p>
            <p>area : {country.area}</p>
            <h3>languages : </h3>
            <ul>
            {Object.entries(country.languages).map((lang)=> <li key={lang[0]}>{lang[1]}</li>)}
            </ul>
            <img alt="" src={country.flags.png}/>
            <h2>Weather in {country.capital[0]}</h2>
            <p> Temperature {weather.temperature} </p>
            <img alt="" src={weather.iconUrl} />
            <p> Wind {weather.wind}</p>
        </div>
    )
}

export default OneCountry