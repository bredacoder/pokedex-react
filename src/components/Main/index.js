import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';
import PokemonCard from '../PokemonCard';

const Main = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => {
        setPokemons(response.data['results'])
      });
  }, [])

  return (
    <main>
      <form className="pokedex-control">
        <div className="form-control">
          <label htmlFor="filter-name">Name:</label>
          <input
            type="search"
            id="filter-name" />
        </div>
        <div className="form-control">
          <label htmlFor="filter-type">Type:</label>
          <select id="filter-type">
            <option value="">All</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="sort">Sort:</label>
          <select id="sort-type">
            <option>Lowest Number (First)</option>
            <option>Highest Number (First)</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
        </div>
      </form>

      <div className="pokedex">
        {pokemons.map((pokemon, i) => (
          <PokemonCard key={i} url={pokemon.url} pokemon={pokemon} />
        ))}
      </div>

    </main>
  );
}

export default Main;