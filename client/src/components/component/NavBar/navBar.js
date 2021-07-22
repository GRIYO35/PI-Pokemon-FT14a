import React from 'react'
import './navBar.css';
import {NavLink} from 'react-router-dom'
import SearchBar  from '../SearchBar/searchBar'

export function Navbar() {
    return (
        <header>
          <nav className="Navbar">
                <ul className="leftSide">
                  <li className="NavLinks">
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/newPoke">NewPokemon</NavLink>
                  <NavLink to="/home/filter">Filter</NavLink>
                  </li>
                  <div className ="SearchBar">
                  <SearchBar/>
                  </div>
                </ul>
          </nav>
        </header>
       );
    }