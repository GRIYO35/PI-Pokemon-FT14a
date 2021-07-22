import './home.css'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPokemons} from '../../../Redux/Actions/Index.js'
import Pokemon from '../../component/Pokemon/pokemon.js'
import { NavLink } from 'react-router-dom';


export function Home() {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList)
    console.log(pokemonList)
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    //const pokemonSearched = useSelector(state => state.pokemonSearched)
    //const history = useHistory()
    
    useEffect(() =>{
        dispatch(getPokemons());
    },[dispatch])

      const indexOfLastPost = currentPage * pokemonsPerPage;
      const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
      const currentPokemons = pokemonList.slice(indexOfFirstPost, indexOfLastPost);

      const pageNumber = Math.ceil(pokemonList.length / pokemonsPerPage);

      const nextPage = () => {
          if(currentPage < pageNumber) setCurrentPage(currentPage + 1);
          else setCurrentPage(1)
      }

      const prePage = () => {
          if(currentPage !== 1)  setCurrentPage(currentPage - 1);
          else setCurrentPage(pageNumber)
      }

    if (pokemonList.length < 12) {
    return (
        <div className='loading'>
            <h1>LOADING ...</h1>
            <img src='https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif' alt='pokemon img'/>
        </div>
        )
    } else { 
        return  ( <div className="home">     
            <div className="row center"> 
            {
            currentPokemons.map((pokemon, index)=> (
                <NavLink to={`/pokeDetail/${pokemon.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                 <Pokemon key={index} pokemon={pokemon}></Pokemon>
                </NavLink> 
        )) 
        }
        </div>
            <button onClick={() => {prePage()}}>PreviousPage</button>
            <button onClick={() => {nextPage()}}>NextPage</button>
        </div>)
    } 

}

export default Home
