import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css'

const PokemonCard = ({ pokemon, url }) => {
  const [types, setTypes] = useState([]);

  const pokemonIndex = Number(url.split("/")[url.split('/').length - 2]);
  const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`
  const imageUrl2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

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

  function handleImage(id) {
    if(id === 412||id === 413||id === 421||id === 487||id === 492||id === 585||
      id === 586 ||id === 641||id === 642||id === 647||id === 648||id === 718||
      id === 720 ||id === 741||id === 745||id === 746||id === 774||id === 778||
      id === 849 ||id === 875||id === 877||id === 888||id === 889||id === 891||
      id === 892 ||id === 893) {
        return imageUrl2
      } else {
        return imageUrl
      }
  }

  return (
    <div className="pokemon">

      <figure className="pokemon-figure">
        <img
          src={handleImage(pokemonIndex)}
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



