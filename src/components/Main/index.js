import React, { useState, useEffect } from 'react';

import { getAllPokemon, getPokemon } from '../../services/pokemon';

import PokemonCard from '../PokemonCard';

import './styles.css';

const Main = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.prev);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon)
      setLoading(false);
    }
    fetchData();
  }, [])

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))

    setPokemonData(_pokemonData)
  }
  console.log(pokemonData)
  return (
    <main>
      { loading ? <h1>Loading...</h1> : (
          <>
            <form className="pokedex-control">
              <div className="form-control">
                <label htmlFor="filter-name">Name:</label>
                <input type="text" id="filter-name" />
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
              {pokemonData.map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon} />
              })}
            </div>
          </>
        ) 
      }
    </main>
  );
}

export default Main;