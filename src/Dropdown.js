import React, { useEffect, useState, useRef } from "react";

import "./Dropdown.css";

const Dropdown = ({ placeHolder, countries, isSearchable, onChange }) => {
    
    const [showMenu, setShowMenu] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState (null)
    const [searchValue, setSearchValue] = useState("")
    const searchRef = useRef();

    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }
    
    const getCountries = () => {
        if (!searchValue) {
            return countries
        }
        return countries.filter((country) =>
        country.toLowerCase().indexOf(searchValue.toLowerCase()) >=0)
    }

    useEffect(() => {
        setSearchValue("")
        if (showMenu && searchRef.current) {
            searchRef.current.focus()
        }
    }, [showMenu])

    useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    })
    
    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    const getDisplay = () => {
      if (selectedCountry) {
        return selectedCountry
      }
      return placeHolder
    };

    const onItemClick = (country) => {
        setSelectedCountry(country)
        onChange(country)
    }

    const isSelected = (country) => {
        if(!selectedCountry) {
            return false
        }
        return selectedCountry === country
    }
  
    return (
      <div className="dropdown-container">
        <div onClick={handleInputClick} className="dropdown-input">
        {showMenu &&(
        <div className="dropdown-menu">
        {isSearchable && (
        <div className="search-box">
            <input onChange={onSearch} value={searchValue} ref={searchRef} />
        </div>
        )}
            {getCountries().map((country) => (
        <div onClick={() => onItemClick(country)} key={country} className={`dropdown-item ${isSelected(country) && "selected"}`}>
            {country}
        </div>
    ))}
    </div>
        )}
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dropdown;