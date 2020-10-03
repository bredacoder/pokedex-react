import React, { Component } from 'react';

import spinner from './spinner.gif'

import fire from '../../assets/icons/fire.svg'
import flying from '../../assets/icons/flying.svg'
import ground from '../../assets/icons/ground.svg'

import './styles.css'

export default class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: ''
  }

  componentDidMount() {
    const { name, url } = this.props
    const pokemonIndex = url.split('/')[url.split('/').length - 2 ]
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`

    this.setState({
      name, 
      imageUrl, 
      pokemonIndex,
      imageLoading: true,
      toManyRequests: false
    })
  }
    

  render() {
    const { 
      name, 
      imageUrl, 
      pokemonIndex
    } = this.state

    return (
        <div className="pokemon">
          {this.state.imageLoading ? (
            <img 
              src={spinner}
              alt="Spinner Loading" 
              style={{ width: '5em', height: '5em', margin: '10px' }}
            />
          ) : null}
          <figure className="pokemon-figure">
            <img
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })} 
              src={imageUrl} 
              alt={name} 
              style={
                this.state.toManyRequests ? { display: "none" } :
                this.state.imageLoading ? null : { display: "block" }
              }  
            />
          </figure>
          {this.state.toManyRequests ? (<h6>
              <span className="toManyRequest">To Many Request</span>
          </h6>) : null}
          <section className="pokemon-description">
            <span className="pokemon-id">
              N°{`00${pokemonIndex}`.slice(-3)}
              <div>
                <img src={fire} alt="fire"></img>
                <img src={flying} alt="flying"></img>
                <img src={ground} alt="ground"></img>
              </div>
            </span>
    
            <h1 className="pokemon-name">
              {name
              .toLowerCase()
              .split(' ')
              .map(
                letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
              .join(' ')} 
            </h1>
            <div className="pokemon-types">
              <span className="pokemon-type background-fire">fire</span>
              <span className="pokemon-type background-flying">flying</span>
            </div>
          </section>
          <section className="pokemon-stats"></section>
        </div>
      )
    
  }
}

