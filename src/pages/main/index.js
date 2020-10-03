import React from 'react';

import PokemonList from '../../components/PokemonList';

import './styles.css'

const Main = () => (
  <main>
    <form className="pokedex-control">
      <div className="form-control">
        <label htmlFor="filter-name">Name:</label>
        <input type="text" id="filter-name"/>
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
    
    <PokemonList />
  </main>
)

export default Main;