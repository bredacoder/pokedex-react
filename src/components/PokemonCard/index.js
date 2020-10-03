import React from 'react';

import './styles.css'

const PokemonCard = ({ pokemon }) => {
  const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`

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
          N°{`00${pokemon.id}`.slice(-3)}
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
          {pokemon.types.map(type => {
            return (
              <span className={`pokemon-type background-${type.type.name}`}>
                {type.type.name}
              </span>
            )
          })}
        </div>

      </section>
    </div>
  )
}

export default PokemonCard;



