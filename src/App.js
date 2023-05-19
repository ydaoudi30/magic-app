import React, { useEffect, useState } from 'react';
import './styles.css';
import magiclogo from './assets/magiclogo.png';
import axios from 'axios';
import CardList from './components/CardList';
import SearchForm from './components/searchForm';
import AutoCompleteRarity from './components/autoCompleteRarity';
import AutoCompleteTypes from './components/autoCompleteTypes';
import IconButton from '@mui/material/IconButton';
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

function App() {
  const [allCards, setAllCards] = useState([]);
  const [allTypes, setTypes] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); 
  const [displayedCards, setDisplayedCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/cards');
        setAllCards(response.data.cards);
        setFilteredCards(response.data.cards);
        setDisplayedCards(response.data.cards.slice(0, 30));
        setCardsCount(response.data.cards.length);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }
    async function fetchTypes() {
      try {
        const response = await axios.get('https://api.magicthegathering.io/v1/types');
        setTypes(response.data.types);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    }
    fetchAllCards();
    fetchTypes();
  }, []);

  const loadMoreCards = () => {
    const newIndex = currentIndex + 30;
    setCurrentIndex(newIndex);
    setDisplayedCards(filteredCards.slice(newIndex, newIndex + 30));
    setCurrentPage(currentPage + 1)
  };

  const deloadCards = () => {
    const newIndex = currentIndex - 30;
    setCurrentIndex(newIndex);
    setDisplayedCards(filteredCards.slice(newIndex, newIndex + 30));
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div>
      
    </div>

      <div className="logo-container">
        <img src={magiclogo} alt="logo" height="100px" width="auto"/>
      </div>
      <div className="search-form-container">

        <div className='autocompleterarity'>
        <SearchForm
          setCurrentIndex={setCurrentIndex}
          setFilteredCards={setFilteredCards}
          setDisplayedCards={setDisplayedCards}
          setCardsCount={setCardsCount}
          setCurrentPage={setCurrentPage}
        />
        </div>
        <div className='autocompleterarity'>
          <AutoCompleteRarity 
          setCurrentIndex={setCurrentIndex}
          setFilteredCards={setFilteredCards}
          setDisplayedCards={setDisplayedCards}
          setCardsCount={setCardsCount}
          setCurrentPage={setCurrentPage}/>
        </div>
        <div className='autocompleterarity'>
          <AutoCompleteTypes 
          allCards={allCards}
          types={allTypes}
          setCurrentIndex={setCurrentIndex}
          setFilteredCards={setFilteredCards}
          setDisplayedCards={setDisplayedCards}
          setCardsCount={setCardsCount}
          setCurrentPage={setCurrentPage}/>
        </div>
      </div>
      
      <div className="button-container">
      <div className="previous-page">
        {currentIndex - 30 >= 0 &&
          <IconButton onClick={deloadCards}>
          <BiSkipPrevious />
        </IconButton>
        }
      </div> 
      
        {cardsCount > 30 && 
        <div className="pagination-container">
            {currentPage} / {Math.floor(cardsCount/30) + 1}
        </div>
        }
      
      <div className="next-page">
        {currentIndex + 30 < cardsCount &&
         <IconButton onClick={loadMoreCards}>
          <BiSkipNext />
        </IconButton>
        }
      </div>
      </div>

      <CardList cards={displayedCards} />
    </div>
  );

}

export default App;