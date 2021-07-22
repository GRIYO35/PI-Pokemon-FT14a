import React from 'react';
import { NavLink } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Navbar} from './navBar.js';

configure({adapter: new Adapter()});

describe('<Navbar />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Navbar />)
  })

  it('Deberia renderizar Tres <Link />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  it('El primer Link debe tener el texto "Home" y cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/home');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual('Home');
  });
  it('El segundo Link debe tener el texto "NewPokemon" y cambiar la ruta hacia "/newPoke"', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/newPoke');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual('NewPokemon');
  });
  it('El tercer Link debe tener el texto "Filter" y cambiar la ruta hacia "/home/filter"', () => {
    expect(wrapper.find(NavLink).at(2).prop('to')).toEqual('/home/filter');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(2).text()).toEqual('Filter');
  });
})