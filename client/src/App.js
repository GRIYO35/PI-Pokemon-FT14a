import React from 'react';
import './App.css';
/* import { useSelector } from 'react-redux'; */
import { Route } from 'react-router-dom';
import { LandingPage } from './components/screens/LandingPage/landingPage.js';
import { Home } from './components/screens/Home/home.js';
import { PokemonDetail } from './components/screens/PokemonDetail/pokemonDetail.js';
import { NewPokemon } from './components/screens/NewPokemon/newPokemon.js';
import { Navbar }  from './components/component/NavBar/navBar.js';
import { Filter } from './components/screens/Filter/filter.js';
import { Searched } from './components/screens/Searched/searched.js';



function App() {
  return (
    <React.Fragment>
      <Route path='/home' component={Navbar} />
      <Route path='/newPoke' component={Navbar} />
      <Route path='/search' component={Navbar} />
      <Route path='/home/filter' component={Filter} />
      <Route path='/search' component={Searched} />
      <Route path='/pokeDetail/:id' component={Navbar} />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/pokeDetail/:id' component={PokemonDetail} />
      <Route path='/newPoke' component={NewPokemon} />
    </React.Fragment>
  );
}



export default App;