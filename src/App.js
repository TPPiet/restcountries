import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import Country from './Country';

const App =() => {
  
  const [data, setData] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("Select a Country")
  const [capital, setCapital] = useState("")
  const [flag, setFlag] = useState("")
  const [languages, setLanguages] = useState([])

  const hook = () =>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
        setCountries(response.data.map(country => country.name.common))
        setSelectedCountry(countries[0])
      })
      .catch(error => {
          console.log(error)
      })
  }
  useEffect(hook, [])

  const handleChange = (value) => {
    console.log("changed")
    setSelectedCountry(value)
    collectCountryData(value)
  }

  const collectCountryData = (country) => {
    data.forEach(element => {
      if (element.name.common === country) {
        setCapital(element.capital)
        setFlag(element.flags.png)
        setLanguages(element.languages)
      }
    });
  }

  return (
    <div className="App">
      <Dropdown placeHolder="Select a Country" countries={countries} isSearchable onChange={(value) => handleChange(value)} />
      <Country countryName={selectedCountry} flag={flag} capital={capital} languages={languages} />
    </div>
  );
}

export default App;
