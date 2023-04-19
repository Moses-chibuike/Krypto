import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ExchangeDetails from '../Components/ExchangeDetails';
import './Home.css';

function Home() {
  const navigate = useNavigate(); // A hook from 'react-router-dom' that provides navigation functionality

  const exchanges = useSelector((state) => state.Exchanges); // A hook from 'react-redux' that selects a piece of state from the store
  const [exchangeList, setExchangeList] = useState([]); // A state hook that initializes the 'exchangeList' state with an empty array

  useEffect(() => {
    setExchangeList(exchanges); // A useEffect hook that updates the 'exchangeList' state when the 'exchanges' state changes
  }, [exchanges]);

  const handleSearch = (text) => { // A function that handles the search feature
    const filterExchanges = exchanges.filter((exc) => (
      exc.name.toLowerCase().includes(text.toLowerCase()) // Filters exchanges by name using case-insensitive search
    ));
    setExchangeList(filterExchanges); // Updates the 'exchangeList' state with the filtered list of exchanges
  };

  const showDetails = (id) => { // A function that handles displaying the details of an exchange
    const itemClick = exchanges.filter((exchange) => exchange.id === id); // Filters the exchange by id
    navigate('/details', { state: itemClick[0] }); // Navigates to the 'details' page with the selected exchange as state data
  };
  
  // A JSX element that displays a search field and a list of exchanges using the 'ExchangeDetails' component
  return (
    <div className="main-container">
      <div className="search-field">
        <input
          type="text"
          placeholder="Search An Exchange"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="exchange-container">
        {exchangeList.map((exchange) => (
          <ExchangeDetails
            key={exchange.id}
            exchange={exchange}
            showDetails={showDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
