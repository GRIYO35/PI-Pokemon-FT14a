const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {Pokemon, Type} = require('../db.js');

const router = Router();

router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let type;
    if(name) {
        var nameLower = name.toLowerCase();
        try {
            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameLower}`); 
            if(pokemon.data.types.length === 1) {
                type = pokemon.data.types[0].type.name;
            } else {
                for (var i=0; i<pokemon.data.types.length; i++){
                    type = type + " " + pokemon.data.types[i].type.name
                }
            }
            var objeto = {
                name: pokemon.data.name.toLowerCase(),
                ID: pokemon.data.id,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: type,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                life: pokemon.data.stats[0].base_stat,
                power: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                velocity: pokemon.data.stats[5].base_stat
            } 
        } catch (error) {
            const pDataBase = await Pokemon.findOne({
                where:{
                    name: nameLower
                },
                include: Type
            })
            if(!pDataBase) {
                return res.status(404).send({message: 'No se encontro el Pokemon'})
            }
            if(pDataBase.types.length === 1) {
                type = pDataBase.types[0].name;
            } else {
                for (var i=0; i<pDataBase.types.length; i++){
                    type = type + " " + pDataBase.types[i].name
                }
            }
            var pTerminado ={
                name : pDataBase.name.toLowerCase(),
                id: pDataBase.id,
                image: "https://s-media-cache-ak0.pinimg.com/originals/f8/29/be/f829bed61f75627eea111dfde089fe2c.png",
                types: type,
                height: pDataBase.height,
                weight: pDataBase.weight,
                life: pDataBase.life,
                power: pDataBase.power,
                defense: pDataBase.defense,
                velocity: pDataBase.velocity
            } 
            return res.send(pTerminado);
            
        }
        return res.send(objeto);
    } else {
        try {
            const pokePag1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
            const pokePag2 = await axios.get(pokePag1.data.next);
            const pokeConcat= pokePag1.data.results.concat(pokePag2.data.results);
            const poke = await Promise.all(pokeConcat.map(async pokemon => {
                let subReq = await axios.get(pokemon.url)
                if(subReq.data.types.length === 1) {
                    type = subReq.data.types[0].type.name;
                } else {
                    for (var i=0; i<subReq.data.types.length; i++){
                        type = type + " " + subReq.data.types[i].type.name
                    }
                }
                return  {
                    name: subReq.data.name.toLowerCase(),
                    id: subReq.data.id, 
                    image: subReq.data.sprites.other.dream_world.front_default,
                    types: type,
                    
                }    
            }))
            
            const pDb = await Pokemon.findAll({
                include: {
                    attributes: ['name'],
                    model: Type,
                    through: {
                        attributes: [],
                    }
                }
            })
            const pDb2 = pDb.map(pokeMap => {
                if(pokeMap.types.length === 1) {
                    type = pokeMap.types[0].name;
                } else {
                    for(var i=0; i<pokeMap.types.length; i++){
                        type = type + " " + pokeMap.types[i].name;
                    }
                }
                return {
                    name: pokeMap.name.toLowerCase(),
                    id: pokeMap.ID,
                    image: "https://s-media-cache-ak0.pinimg.com/originals/f8/29/be/f829bed61f75627eea111dfde089fe2c.png",
                    types: type,
                    
                }

            })
            var pokeFinal = pDb2.concat(poke);
        } catch(error) {
            return res.send('Ocurrio un Error');
        }
    return res.send(pokeFinal); 
    }
})

router.get('/pokemons/:idPokemon', async (req, res) => {
    const idPokemon = req.params.idPokemon
    let type;
    if(idPokemon.length > 5) {
        try{
            var pokeDb = await Pokemon.findByPk({
                where:{
                    ID: idPokemon
                },
                include: Type
            })
            var pokeTerminado ={
                name : pokeDb.name.toLowerCase(),
                id: pokeDb.ID,
                image: pokeDb.image,
                types: pokeDb.types[0].name,
                height: pokeDb.height,
                weight: pokeDb.weight,
                life: pokeDb.life,
                power: pokeDb.power,
                defense: pokeDb.defense,
                velocity: pokeDb.velocity
            }

        }catch (error){
            return res.status(404).send({message: 'No se encontro el Pokemon en la Base de Datos'})
        }
        return res.send(pokeTerminado);
    } else {
        try{
            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            if(pokemon.data.types.length === 1) {
                type = pokemon.data.types[0].type.name;
            } else {
                type = pokemon.data.types[0].type.name + " " + pokemon.data.types[1].type.name
                
            }
    
            var objeto = {
                name: pokemon.data.name.toLowerCase(),
                id: pokemon.data.id,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: type,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                life: pokemon.data.stats[0].base_stat,
                power: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                velocity: pokemon.data.stats[5].base_stat
            } 
        }catch (error) {
            return res.status(404).send({message: 'Nose encontro el Pokemon en la Api'})  
        }
        return res.send(objeto);
    }
})

router.post('/pokemons', async (req, res, next) => {
    const name = req.body.name;
    const id = uuidv4();
    const pokemon = {...req.body, id};
    if(!name) {
        return res.send({      
            message: 'se deben completar todos los campos',
        });
    }
    try {
        const createdPokemon = await Pokemon.create(pokemon);
        const addType = await createdPokemon.addType(req.body.type, {through:'pokemon_type'})
        //const addType2= await createdPokemon.addTipo(req.body.type2, {through:'pokemon_type'})
        const result = await Pokemon.findOne({
            where: {
                name: name
            },
            include: Type
        });
        return res.send(result);
    } catch(error) {
        next(error);
    }
})


module.exports = router;
