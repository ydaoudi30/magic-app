import React , {useState, useEffect, useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';

function AutoCompleteRarity ({
    setCurrentIndex,
    setFilteredCards,
    setDisplayedCards,
    setCardsCount,
    setCurrentPage,}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [displayedRarity, setDisplayedRarity] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = ["Common","Uncommon","Rare","Mythic-Rare","Special","Basic-Land"].filter((suggestion) => suggestion.toLowerCase().includes(searchTerm.toLowerCase()));

    const searchFormRef = useRef(null);
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
     };

     const handleSuggestionClick = (suggestion) => {
        setDisplayedRarity(suggestion);
        setShowSuggestions(false);
        setSearchTerm("");
     }

     const handleSubmit = (event) => {
        event.preventDefault();
        searchCardRarity(displayedRarity);
      };

      async function searchCardRarity(searchTerm){
        try {
            const response = await axios.get(`https://api.magicthegathering.io/v1/cards?rarity=${searchTerm}`);
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
        <>
        <form className="form" onSubmit={handleSubmit} ref={searchFormRef}>
                <input
                    type="text"
                    placeholder="Rechercher par rareté"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus= {() => setShowSuggestions(true)}
                />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>{suggestion}</li>
                    ))}
                </ul>
        )}
            <IconButton className="searchbutton" type="submit">
                <AiOutlineSearch />
            </IconButton>
            </form>
            <div className={`displayed-rarity ${displayedRarity}`}>
                {displayedRarity && `${displayedRarity}`}
            </div>
        </>       
  );
}

export default AutoCompleteRarity;