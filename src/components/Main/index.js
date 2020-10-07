import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./styles.css";
import PokemonCard from "../PokemonCard";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [name, setName] = useState();
  const [types, setTypes] = useState();
  const inputRef = useRef(null);

  console.log(types)

  const options = [
    { value: 'normal' }, { value: 'fighting' }, { value: 'flying' }, { value: 'poison' },
    { value: 'ground' }, { value: 'rock' }, { value: 'bug' }, { value: 'ghost' },
    { value: 'steel' }, { value: 'fire' }, { value: 'water' }, { value: 'grass' },
    { value: 'electric' }, { value: 'psychic' }, { value: 'ice' }, { value: 'dragon' },
    { value: 'dark' }, { value: 'fairy' }
  ]

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        setPokemons(response.data["results"]);
      });
  }, []);

  useEffect(() => {
    if (name !== undefined) {
      setFilteredPokemons(
        pokemons.filter((pokemon) => pokemon.name.includes(name))
      );
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [pokemons, name]);
  

  return (
    <main>
      <form className="pokedex-control">
        <div className="form-control">
          <label htmlFor="filter-name">Name:</label>
          <input
            type="search"
            id="filter-name"
            ref={inputRef}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="filter-type">Type:</label>
          <select id="filter-type"
            onChange={e => {setTypes(e.target.value)}}
          >
            <option value="undefined">All</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.value}</option>
            ))}
          </select>
        </div>

{/* 
        onChange={e => { setTypes(e.target.value) }}
            options={[
              { value: 'normal' }, { value: 'fighting' }, { value: 'flying' }, { value: 'poison' },
              { value: 'ground' }, { value: 'rock' }, { value: 'bug' }, { value: 'ghost' },
              { value: 'steel' }, { value: 'fire' }, { value: 'water' }, { value: 'grass' },
              { value: 'electric' }, { value: 'psychic' }, { value: 'ice' }, { value: 'dragon' },
              { value: 'dark' }, { value: 'fairy' }
            ]} */}
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
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} url={pokemon.url} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
};

export default Main;
