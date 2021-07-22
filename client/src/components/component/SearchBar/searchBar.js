import React,{useState} from 'react';
import './searchBar.css';
import {searchPokemon} from '../../../Redux/Actions/Index.js';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function SearchBar () {

    const dispatch = useDispatch();
    const pokemonSearched = useSelector(state => state.pokemonSearched)
    console.log(pokemonSearched)

    const[search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value)
        dispatch(searchPokemon(e.target.value))
    }
    
    const history = useHistory();

    const handleSubmit= (e) => {
    e.preventDefault();
    if(search !==  "") {
        history.push(`/pokeDetail/${pokemonSearched[0].ID}`)
        setSearch('')
      }
    } 

    return (
        <div>
            <form>
                <div className="rightSide">
                    <input type="text" value={search} placeholder="Pokemons" onChange={handleChange}/>
                    <button onClick={handleSubmit}>Search</button>
                </div>
            </form>
        </div>
            )
}