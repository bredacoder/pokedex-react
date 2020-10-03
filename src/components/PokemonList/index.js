import React, { Component } from 'react';

import PokemonCard from '../PokemonCard'
import api from '../../services/api';

import './styles.css'

export default class PokemonList extends Component {
  state = {
    pokemons: [],
  }
  
  componentDidMount() {
    this.loadPokemons()
  }

  loadPokemons = async () => {
    const response = await api.get()

    this.setState({ pokemons: response.data['results'] })    
  }
  
  render() {
    const { pokemons } = this.state
    
    return (
      <>
        {pokemons ? (
          <section className="pokedex">
            {pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.name} 
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </section>
        ) : (
          <h1>Loading Pokemon</h1>
        )}
      </>
    )
  }
}