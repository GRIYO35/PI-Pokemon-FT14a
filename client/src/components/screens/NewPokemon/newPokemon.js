import React from 'react'
import './newPokemon.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { newPokemon, getTypes, getPokemons } from '../../../Redux/Actions/Index.js'

export function NewPokemon() {

    const pokemonTypes = useSelector(state => state.pokemonTypes)

    const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(getTypes());
      dispatch(getPokemons());
  },[dispatch])

    const [input, setInput] = React.useState({
       name: '',
       life: '',
       power: '',
       defense: '',
       velocity: '',
       height: '', 
       weight: '',
       type: '',
      });
     
      const [errors, setErrors] = React.useState({});
    
      const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      }

      const handleSubmit = function(e) {
        e.preventDefault();
        newPokemon(input);
        console.log(input)
        setInput({
          name: '',
          life: '',
          power: '',
          defense: '',
          velocity: '',
          height: '', 
          weight: '',
          type: '',
        });
        
      }
      
      return (
        <div className="form">
        <form className='list' onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <input className={errors.name && 'danger'} type="text" name="name" onChange={handleInputChange} value={input.name} />
              {errors.name && (
                <p className="danger">{errors.name}</p>
                )}
               
              <div>
              <label>Life: </label>
              <input className={errors.life && 'danger'} type="number" name="life" onChange={handleInputChange} value={input.life}  placeholder='0 - 100'/>
              {errors.life && (
              <p className="danger">{errors.life}</p>
              )}
            
         <div>
              <label>Power: </label>
              <input className={errors.power && 'danger'} type="number" name="power" onChange={handleInputChange} value={input.power} placeholder='0 - 100'/>
              {errors.power && (
              <p className="danger">{errors.power}</p>
              )}
         <div>
              <label>Defense: </label>
              <input className={errors.defense && 'danger'} type="number" name="defense" onChange={handleInputChange} value={input.defense}placeholder='0 - 100' />
              {errors.defense && (
              <p className="danger">{errors.defense}</p>
              )}
             
         <div>
              <label>Velocity: </label>
              <input className={errors.velocity && 'danger'} type="number" name="velocity" onChange={handleInputChange} value={input.velocity} placeholder='0 - 100'/>
              {errors.velocity && (
              <p className="danger">{errors.velocity}</p>
              )}
              
         <div>
              <label>Height: </label>
              <input className={errors.heigth && 'danger'} type="number" name="height" onChange={handleInputChange} value={input.height} placeholder='0 - 100' />
              {errors.height && (
              <p className="danger">{errors.height}</p>
              )}
            
         <div>
              <label>Weight: </label>
              <input className={errors.weigth && 'danger'} type="number" name="weight" onChange={handleInputChange} value={input.weight} placeholder='0 - 100'/>
              {errors.weight && (
              <p className="danger">{errors.weight}</p>
              )}
              <br/>
              <span>Type: </span>
              <select className={errors.type && "type"} name="type" value={input.ID} onChange={handleInputChange}>
                    <option value='null'>Null</option>
                    {pokemonTypes && pokemonTypes.map(p => (
                    <option value={p.id} name="p.name">{p.name}</option>
                    ))}
                    {errors.type && (
                    <p className="tipe">{errors.type}</p>
                    )}
                </select>
                <br/>  
            </div>
            </div>  
            </div>
            </div>
            </div>
            </div>
            </div>
            <button className="button" onClick={()=>dispatch(newPokemon(input))}>CREATE</button>
          </form>
          </div>
        )
} 

 export function validate(input) {
    const pattern = new RegExp('^[A-Z]+$', 'i');
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!pattern.test(input.name)) {
      errors.name = 'Name must contain letters only';
    }
    if (!input.life) {
      errors.life = 'Life is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.life)) {
      errors.life = 'Life must be between 1 and 100';
    }
    if (!input.power) {
      errors.power = 'Power is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.power)) {
      errors.power = 'Power must be between 1 and 100';
    }
    if (!input.defense) {
      errors.defense = 'Defense is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.defense)) {
      errors.defense = 'Defense must be between 1 and 100';
    }
    if (!input.velocity) {
      errors.velocity = 'Velocity is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.velocity)) {
      errors.velocity = 'Velocity must be between 1 and 100';
    }
    if (!input.height) {
      errors.height = 'Heigth is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.height)) {
      errors.height = 'Heigth must be between 1 and 100';
    }
    if (!input.weight) {
      errors.weight = 'Weigth is required';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.weight)) {
      errors.weight = 'Weigth must be between 1 and 100';
    }
    if (!input.type || input.type === "null") {
      errors.type = 'Type can not be null';
    } 
    return errors;
};

export default NewPokemon;


