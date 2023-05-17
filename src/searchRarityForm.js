import React, { useState } from 'react';

function SearchRarityForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher par rareté"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchRarityForm;