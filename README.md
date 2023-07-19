Requerimientos de instalacion:
	Al haber eliminado las carpetas `node_modules` se debe
	ejecutar en cada una de las carpetas (front y back) el comando `yarn install`

Modo de ejecución:
	En distintas ventanas del terminal:
		Front:
			Dentro de la carpeta `front` utilizar comando `yarn dev`
			Este se debe ejecutar en el puerto `5173`
		Back:
			Dentro de la carpeta `back` utilizar comando `yarn dev`
			Se ejecuta de acuerdo a delimitaciones en el archivo `.env`

Espcificaciones:
	A lo largo de la tarea me apoyé en ChatGPT para dudas particulares de sintaxis
	y en conceptos que no me quedaron claros en las clases y cápsulas.
	En momentos donde lo utilicé de manera explícita dejé comentado "Con ayuda de ChatGPT".

	Utilicé las capsulas de koa para el levantamiento general del back-end.

	Me enfoqué en desarrollar un front-end sólido siguiendo las especificaciones del enunciado
	y un back-end siguiendo las delimitaciones de las cápsulas.

Completitud:
	Manejo de operaciones y números en el front-end mediante interfaz de react
	Feedback al usuario de operacion en tiempo real mediante el visor de react
	Manejo de negativos y errores en el front-end (Exceptuando división por 0)
	Manejo de operaciones en el back-end en environment koa

	Manejo de error división por 0 en back-end koa
	Definición de parámetros en back-end mediante dotenv

	Manejo general de errores para cada solicitud, contando con levantamiento de
	errores de operaciones y de solicitudes (try, catch).

	