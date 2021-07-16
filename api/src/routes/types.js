const { Router } = require('express');


const router = Router();

router.get('/', async (req, res) => {
    
    const tDataBase =await Type.findAll();
    if(tDataBase.length === 0) {
        try {
            const type = await axios('https://pokeapi.co/api/v2/type');
            for(let i in type.data.results){
                await Type.create({name: type.data.results[i].name});
            }
         } catch(error) {

           return res.status(404).send('Se produjo un Error')
         }
        } else {
            return res.status(200).json(tDataBase);
        }
})


module.exports = router;
