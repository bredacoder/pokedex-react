import React, { useState, useEffect, useCallback } from "react";

import api from '../../services/api';

import "./styles.css";
import PokemonCard from "../PokemonCard";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [option, setOption] = useState();
  const [name, setName] = useState();


  useEffect(() => {
    getPokemons()
  }, []);

  async function getPokemons() {
    try {
      const response = await api.get("/api/v2/pokemon?limit=150")
      
      setPokemons(response.data["results"]);
      setFilteredPokemons(response.data["results"]);
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (name !== undefined) {
      setFilteredPokemons(
        pokemons.filter((pokemon) => pokemon.name.includes(name))
      );
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [pokemons, name]);

  const filterPokemonsAZ = useCallback(
    (e) => {
      setOption(e.target.value);

      if (e.target.value === "A-Z") {
        const filtered = pokemons.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        setFilteredPokemons(filtered);

      } else if (e.target.value === "Z-A") {
        const filtered = pokemons.sort(function (a, b) {
          return b.name < a.name ? -1 : b.name > a.name ? 1 : 0;
        });
        setFilteredPokemons(filtered);

      } else if (e.target.value === 'Lowest Number (First)') {

        getPokemons()

      } else if (e.target.value === 'Highest Number (First)') {
        const filtered = pokemons.reverse()
        setFilteredPokemons(filtered)

      } else {
        setFilteredPokemons(pokemons);
      }
    },
    [pokemons]
  );

  return (
    <main>
      <form className="pokedex-control">
        <div className="form-control">
          <label htmlFor="filter-name">Name:</label>
          <input
            type="search"
            id="filter-name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
            
        <div className="form-control">
          <label htmlFor="sort">Sort:</label>
          <select id="sort-type" onChange={filterPokemonsAZ}>
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
