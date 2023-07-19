import koa from 'koa';
import koaLogger from 'koa-logger';
import { koaBody } from 'koa-body';
import router from './routes.js';
import cors from 'koa-cors'
import dotenv from 'dotenv'

// Establecemos configuracion de dotenv
dotenv.config()

// Creamos una instancia de koa
const app = new koa();

// Configuración de cors
app.use(cors({ origin: `http://localhost:${process.env.PORT_ORIGIN}` }));

// Middlewares de koa
app.use(koaLogger());
app.use(koaBody());

// Utilizacion de las rutas del Router
app.use(router.routes());

// Middleware de respuesta a la peticion
app.use(async (ctx, next) => {
	// Si no existe una respuesta, continuar
	await next;
	// Se verifica la ruta y el metodo de la peticion (Con ayuda de ChatGPT)
	// Para la suma con GET
	if (ctx.path === '/suma' && ctx.method === 'GET') {
		// Se envia la respuesta
		ctx.body = ctx.response.body;
	}
	// Para la multiplicacion con GET
	else if (ctx.path === '/multiplicacion' && ctx.method === 'GET') {
		// Se envia la respuesta
		ctx.body = ctx.response.body;
	}
	// Para la resta con POST
	else if (ctx.path === '/resta' && ctx.method === 'POST') {
		// Se envia la respuesta
		ctx.body = ctx.response.body;
	}
	// Para la division con POST
	else if (ctx.path === '/division' && ctx.method === 'POST') {
		// Se envia la respuesta
		ctx.body = ctx.response.body;
	}
});

// Iniciar el servidor en el puerto indicado
app.listen(process.env.PORT, () => {
	console.log(`Iniciando app. Escuchando en el puerto ${process.env.PORT}`);
})