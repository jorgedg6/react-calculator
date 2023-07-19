import Router from 'koa-router';
import num_suma from './routes/suma.js'
import num_resta from './routes/resta.js'
import num_multi from './routes/multiplicacion.js'
import num_divi from './routes/division.js'

// Se crea una instancia de Router
const router = new Router();

// Se utilizan las rutas de suma
router.use('/suma', num_suma.routes());

// Se utilizan las rutas de resta
router.use(num_resta.routes());

// Se utilizan las rutas de division
router.use(num_divi.routes());

// Se utilizan las rutas de multiplicacion
router.use('/multiplicacion', num_multi.routes());

export default router;