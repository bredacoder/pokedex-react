import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css'

const PokemonCard = ({ pokemon, url }) => {
  const [types, setTypes] = useState([]);

  const pokemonIndex = url.split("/")[url.split('/').length - 2];
  const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`

  useEffect(() => {
    async function loadPokemon() {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
        .then((response) => {
          const data = response.data;
          const type = data.types;
    
          setTypes(type);
        });
    }
    loadPokemon();
  }, [pokemonIndex]);

  return (
    <div className="pokemon">

      <figure className="pokemon-figure">
        <img
          src={imageUrl}
          alt=""
        />
      </figure>

      <section className="pokemon-description">
        <span className="pokemon-id">
          N°{`00${pokemonIndex}`.slice(-3)}
        </span>
      

        <h1 className="pokemon-name">
          {pokemon.name
            .toLowerCase()
            .split(' ')
            .map(
              letter => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(' ')}
        </h1>

        <div className="pokemon-types">
          {types.map(type => {
            return (
              <span 
                key={type.type.name}
                className={`pokemon-type background-${type.type.name}`}
              >{type.type.name}</span>
            )
          })}
        </div>

      </section>
    </div>
  )
}

export default PokemonCard;



