import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";

import PokemonList from './components/PokemonList';
import './App.css';
 

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20; 

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

  useEffect(() => {
    // Filter Pokémon based on search query
    const filtered = pokemon.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPokemon(filtered);
  }, [pokemon, searchQuery]);

  const fetchPokemon = () => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * limit}`)
      .then(response => {
        setPokemon(response.data.results);
        setFilteredPokemon(response.data.results);
        setLoading(false);
        setTotalPages(Math.ceil(response.data.count / limit));
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      });
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div className="search-container">
        <CiSearch className="search-icon" />
        <input className='ipt'
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? <p>Loading...</p> : <PokemonList pokemon={filteredPokemon} />}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        
      </div>
    
    </div>
  );
}

export default App;
