import './Boton.css'

// Se define el componente Boton
// Recibe el caracter que se va a mostrar y la funcion que se ejecuta al dar click
export default function Boton({ caracter, handleButtonClick }) {
	return (
		// Se define el className segun la naturaleza
		// del caracter con un operador ternario
		// Se define la función onClick como la funcion recibida
		<div className={!isNaN(caracter) ? 'boton' : 'boton-operador'} onClick={() => handleButtonClick(caracter)}>
			{caracter}
		</div>
	)
}