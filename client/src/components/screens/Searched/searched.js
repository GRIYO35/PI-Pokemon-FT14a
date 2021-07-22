import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import Pokemon from '../../component/Pokemon/pokemon'
import { Link } from 'react-router-dom';


export function Searched() {
    const pokemonSearched =  useSelector(state => state.pokemonSearched)

    const [loading] = useState(false); 

if(pokemonSearched === null) {
return (
    <div>
        <h1>There was a mistake!!!</h1>
        <img src='https://img.wattpad.com/a5cadfee0c01ae05e9acf6618dc8f6220886e205/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5144766a6e4f4b37723344356d513d3d2d3730343132303832332e313538663962396439383138373539363130323136363835383231332e676966' alt='pokemon img'/>
    </div>
    )
}else if (pokemonSearched === undefined) {
    return (
        <div>
                <h1>LOADING ...</h1>
            <img src='https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif' alt='pokemon img'/>
        </div>
        )
    } else { 
    
    return (
        <div>
            <div className="row center"> 
                {
                 pokemonSearched.map((pokemon, index)=> (
                    <Link to={`/pokeDetail/${pokemon.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <Pokemon key={index} pokemon={pokemon} loading={loading}></Pokemon>
                    </Link> 
              ))
              }
              </div>
            
        </div>
    )
}

}
