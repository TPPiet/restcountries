const Country= ({countryName, flag, capital, languages}) => {
    return(
        <div>
            <p>Name: {countryName}</p>
            <p>Capital: {capital}</p>
            <p>Spoken language(s): {Object.values(languages)}</p>
            <img 
                src={flag}
                alt="Flag"
                height="200"
            />
        </div>
    )
}
export default Country;