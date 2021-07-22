import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonDetail, clearPokemonDetail } from '../../../Redux/Actions/Index.js'
import React from 'react'
import './pokemonDetail.css'

export function PokemonDetail() {
    
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);
    const {id} = useParams();

    useEffect(() =>{
        dispatch (getPokemonDetail(id));
        return () => {
            dispatch (clearPokemonDetail())
        }
    },[dispatch, id])

     if(pokemonDetail === null) {
        return (
            <div className='notFound'>
                <h1>There was a mistake!!!</h1>
                <img src='https://img.wattpad.com/a5cadfee0c01ae05e9acf6618dc8f6220886e205/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5144766a6e4f4b37723344356d513d3d2d3730343132303832332e313538663962396439383138373539363130323136363835383231332e676966' alt='pokemon img'/>
            </div>
            )
        }else if (pokemonDetail === undefined) {
            return (
                <div className='loading'>
                     <h1>LOADING ...</h1>
                    <img src='https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif' alt='pokemon img'/>
                </div>
                )
            } else { 
                return  (<div className="detail">
                <div key={pokemonDetail.id} className="bigcard">
                    <img className="large" src={pokemonDetail.image ? pokemonDetail.image :"https://i.pinimg.com/400x300/7d/8e/61/7d8e61392073ef38d5b6b671272f6097.jpg"} alt={pokemonDetail.name} /> 
                        <div className="card-body1">
                            <h2>Name: {pokemonDetail.name}</h2>
                            <h4>ID: {pokemonDetail.id}</h4>
                            <h4>Heigth: {pokemonDetail.height}</h4>
                            <h4>Weigth: {pokemonDetail.weight}</h4>
                            <h4>Life: {pokemonDetail.life}</h4>
                            <h4>Power: {pokemonDetail.power}</h4>
                            <h4>Defense: {pokemonDetail.defense}</h4>
                            <h4>Velocity: {pokemonDetail.velocity}</h4>
                            <h4>Types: {pokemonDetail.types}</h4>
                        </div>
                </div>
            </div>)
    }
    
}