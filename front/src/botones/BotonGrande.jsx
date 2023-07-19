import './BotonGrande.css'

// Se define el componente Boton
// Recibe el caracter que se va a mostrar y la funcion que se ejecuta al dar click
export default function BotonGrande({ caracter, handleButtonClick }) {
	return (
		// Se define la función onClick como la funcion recibida
		<div className='boton-grande' onClick={() => handleButtonClick(caracter)}>
			{caracter}
		</div>
	)
}