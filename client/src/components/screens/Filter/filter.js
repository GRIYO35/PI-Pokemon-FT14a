import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './filter.css'
import {filterPokemon, filterApi, orderApi} from '../../../Redux/Actions/Index.js'
import Pokemon from '../../component/Pokemon/pokemon'
import { NavLink } from 'react-router-dom';

export function Filter() {
    const dispatch = useDispatch(); // falta use effect con estado para filtrar los pokemone

    const pokemonFiltered = useSelector(state => state.pokemonFiltered)
    const pokemonTypes = useSelector(state => state.pokemonTypes)
    const pokemonList = useSelector(state => state.pokemonList);


      function filter(e) {
        dispatch(filterPokemon(e.target.value, pokemonList))
      }

      function filtApi(e) {
        dispatch(filterApi(e.target.value, pokemonList))
      }

      function ordApi(e) {
        dispatch(orderApi(e.target.value, pokemonList))
      }



    return (
        <div>
          <div className ="filtered">
             <span > By Type:</span>
                <select className="type" name="type"  onChange={filter}>
                    <option value='null'>Null</option>
                    {pokemonTypes && pokemonTypes.map((p, index) => (
                    <option value={p.name} key={index} name="p.name">{p.name}</option>
                    ))}
                </select>  
            <span> By Creator:</span>
            <select className="type" name="type" onChange={filtApi}>
                    <option value="null">Null</option>
                    <option value="all">All</option>
                    <option value="api">Api Poke</option>
                    <option value="db">Created Poke</option>
            </select>        
            <span>Order By:</span>
                <select className="type" name="type" key='order' onChange={ordApi}>
                    <option value="null">Null</option>
                    <option value="az" name='az'>A - Z</option>
                    <option value="za" name='za'>Z - A</option>
                    <option value="attack+" name='null'>Power +</option>
                    <option value="attack-" name='null'>Power -</option>                    
                </select>  
                </div>

                 <ul className ='filter'>
                {
                    pokemonFiltered && pokemonFiltered.map((pokemon, index)=> (
                       <NavLink to={`/pokeDetail/${pokemon.id}`} style={{ textDecoration: 'none', color: 'black',}}>
                       <Pokemon key={index} pokemon={pokemon}></Pokemon>
                       </NavLink> 
                 )) 

              }
                </ul>
            
            
        </div>
    )
}