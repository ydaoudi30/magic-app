import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';

function SearchForm({ 
  setCurrentIndex,
  setFilteredCards,
  setDisplayedCards,
  setCardsCount,
  setCurrentPage }) {

  const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCards(searchTerm);
  };

  async function searchCards(searchTerm) {
    try {
      const response = await axios.get(`https://api.magicthegathering.io/v1/cards?name=${searchTerm}`);
      const cards = response.data.cards;
      console.log(cards);
      setCurrentIndex(0);
      setFilteredCards(cards);
      setDisplayedCards(cards.slice(0, 30));
      setCardsCount(cards.length);
      setCurrentPage(1)
    } catch (error) {
      console.error('Error searching cards:', error);
    }
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <IconButton className="searchbutton" type="submit">
        <AiOutlineSearch />
      </IconButton>
    </form>
  );
}

export default SearchForm;