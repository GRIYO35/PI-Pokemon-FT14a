import './landingPage.css';
import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {getTypes} from '../../../Redux/Actions/Index.js'
import { NavLink } from 'react-router-dom';

export function LandingPage (){
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getTypes());
    },[dispatch])
    
    return (
        <div className='Landingpage'>
            <div>
                <NavLink to='/home' >
                <button className="btn">WELCOM TO DE POKEMON WORLD</button>
                </NavLink>
            </div>
        </div>
    )
}