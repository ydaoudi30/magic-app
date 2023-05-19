import React , {useState, useEffect, useRef} from 'react'
import IconButton from '@mui/material/IconButton';
import { AiOutlineSearch } from "react-icons/ai";

function AutoCompleteTypes ({
    allCards,
    allTypes,
    setCurrentIndex,
    setFilteredCards,
    setDisplayedCards,
    setCardsCount,
    setCurrentPage,}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState([]);
    const [suggestions, setSuggestions] = useState(allTypes);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const currentSuggestions = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(searchTerm.toLowerCase()));
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
        console.log(suggestions)
     };

     const handleSuggestionClick = (suggestion) => {
        setSearchTerms((prevSearchTerms) => prevSearchTerms.concat(suggestion));
        setSuggestions((prevSuggestions) => prevSuggestions.filter((item) => item !== suggestion));
        setShowSuggestions(false);
     }

     const handleSubmit = (event) => {
        event.preventDefault();
        searchCardType(searchTerms);
        console.log(searchTerms);
      };

      const searchCardType = (searchTerms) => {
        const filteredCards = allCards.filter((card) =>
            searchTerms.some((term) => card.type.toLowerCase().includes(term.toLowerCase()))        
        );
        setCurrentIndex(0);
        setFilteredCards(filteredCards);
        setDisplayedCards(filteredCards.slice(0, 30));
        setCardsCount(filteredCards.length);
        setCurrentPage(1);
      };

    return (
        <>
            <form className="form" onSubmit={handleSubmit} ref={searchFormRef}>
                <input
                    type="text"
                    placeholder="Rechercher par type"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus= {() => setShowSuggestions(true)}
                />
            {showSuggestions && (
                <ul className="suggestions">
                    {currentSuggestions.map((suggestion) => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>{suggestion}</li>
                    ))}
                </ul>
        )}
            <IconButton className="searchbutton" type="submit">
                <AiOutlineSearch />
            </IconButton>
            </form>
            <div className="search-terms-container">
                {searchTerms.map((term, index) => (
                    <span key={index} className="search-term">{term}</span>
                ))}
            </div>

        </>        
  )
}

export default AutoCompleteTypes;