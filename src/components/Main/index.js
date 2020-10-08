import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import "./styles.css";
import PokemonCard from "../PokemonCard";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [option, setOption] = useState();
  const [name, setName] = useState();
  const inputRef = useRef(null);

  // console.log(sortPokemons)

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        setPokemons(response.data["results"]);
        setFilteredPokemons(response.data["results"]);
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
      } else {
        setFilteredPokemons(pokemons);
      }
    },
    [pokemons, option]
  );

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
