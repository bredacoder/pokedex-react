import React, { useState, useEffect } from 'react';

import { getAllPokemon, getPokemon } from '../../services/pokemon';

import nextIcon from '../../assets/icons/next.png'
import prevIcon from '../../assets/icons/prev.png'

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
      setLoading(false)
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      }))

    setPokemonData(_pokemonData);
  }
  console.log(pokemonData)
  return (
    <main>
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

      <div className="btn">
        <button disabled={!prevUrl} onClick={prev}><img src={prevIcon} alt="prevIcon"/></button>
        <button 
          disabled={nextUrl === "https://pokeapi.co/api/v2/pokemon?offset=160&limit=20"} 
          onClick={next}>
          <img src={nextIcon} alt="nextIcon"/>
        </button>
      </div>
      { loading ?
        <>
          <div className="container loader">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </>
        : (
          <>
            <div className="pokedex">
              {pokemonData.map((pokemon, i) => {
                return <PokemonCard key={i} pokemon={pokemon} />
              })}
            </div>

            <div className="btn">
              <button disabled={!prevUrl} onClick={prev}><img src={prevIcon} alt="" /></button>
              <button 
                disabled={nextUrl === "https://pokeapi.co/api/v2/pokemon?offset=160&limit=20"} 
                onClick={next}>
                <img src={nextIcon} alt="nextIcon"/>
              </button>
            </div>
          </>
        )
      }
    </main>
  );
}

export default Main;