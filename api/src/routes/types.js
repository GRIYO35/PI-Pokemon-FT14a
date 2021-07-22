const { Router } = require('express');
const {Type} = require('../db.js');
const axios = require('axios');

const router = Router();


router.get('/types', async (req, res) => {

    const tDataBase = await Type.findAll();

    if(tDataBase.length === 0) {
        try {
            const types = await axios.get('https://pokeapi.co/api/v2/type')
            for(let i=0; i<types.data.results.length; i++){
                await Type.create({name: types.data.results[i].name});
            }
         } catch(error) {

           return res.status(404).send('Se produjo un Error')
         }
        } else {
            return res.status(200).json(tDataBase);
        }
})


module.exports = router;
