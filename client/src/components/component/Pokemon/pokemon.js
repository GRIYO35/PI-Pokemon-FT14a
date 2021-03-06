import React from 'react'
import './pokemon.css'

export default function Pokemon(props) {
    const {pokemon} = props;
    
    return (
            <div className="row center">
                <div key={pokemon.id} className="card">
                  <img className="medium" src={pokemon.image} alt={pokemon.name} /> 
                  <div className="card-body">
                    <h2>{pokemon.name}</h2>
                  </div>
                </div>
            </div>
    )
}
