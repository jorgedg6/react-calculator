import Router from "koa-router";

// Se crea el router
const router = new Router();

// Rutas con POST para la resta de numeros (Ayuda de ChatGPT)
router.post('/resta', async (ctx) => {
	try {
		// Se extraen los numeros del ctx
		const { num1, num2 } = ctx.request.body;
		// Se transforman en float y se restan
		const result = parseFloat(num1) - parseFloat(num2);
		// Se guarda el resultado en el body del ctx
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