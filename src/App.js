import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './styles.css';
import SearchForm from './searchForm';
import SearchRarityForm from './searchRarityForm';
import SearchTypeForm from './searchTypeForm';
import CardList from './CardList';

function App() {
  const [allCards, setAllCards] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/cards');
        setAllCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }

    fetchAllCards();
  }, []);

  const searchCards = (searchTerm) => {
    const filteredCards = allCards.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedCards(filteredCards);
  };

  const searchCardRarity = (searchTerm) => {
    const filteredCards = allCards.filter((card) =>
      card.rarity.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedCards(filteredCards);
  };

  const searchCardType = (searchTerm) => {
    const filteredCards = allCards.filter((card) =>
      card.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedCards(filteredCards);
  };

  

  return (
    <div>
      <h1>Magic the gathering</h1>
      <div className="search-form-container">
        <SearchForm onSearch={searchCards} />
        <SearchRarityForm onSearch={searchCardRarity} />
        <SearchTypeForm onSearch={searchCardType} />
      </div>
      
      <CardList cards={searchedCards.length > 0 ? searchedCards : allCards} />
    </div>
  );

  
}

export default App;
