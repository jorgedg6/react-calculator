import Router from "koa-router";

// Se crea el router
const router = new Router();

// Rutas con POST para la division de numeros (Ayuda de ChatGPT para la extracción de numeros)
router.post('/division', async (ctx) => {
	try {
		// Se extraen los numeros del ctx
		const { num1, num2 } = ctx.request.body;
		// Se realiza la division
		const result = parseFloat(num1) / parseFloat(num2);
		// Si el resultado es Infinity (división por cero) se lanza un error personalizado.
		if (result === Infinity) {
			throw new Error('No se puede dividir por cero.');
		}
		// Se retorna el resultado con exito
		ctx.body = {
			"status": "success",
			"value": result
		}
	}
	// En caso de error
	catch (error) {
		// Se retorna el error
		ctx.body = {
			"status": "error",
			"value": error.message
		}
	}
});

export default router;