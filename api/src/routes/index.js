const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require('./pokemons.js')
const typesRoutes = require('./types.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', pokemonsRoutes);
router.use('/', typesRoutes)


module.exports = router;
