import './Calculadora.css'
import Visor from './Visor';
import Boton from './botones/Boton'
import BotonGrande from './botones/BotonGrande'
import { useState } from 'react';

export default function Calculadora() {
	// Se guarda la expresión de operacion en una variable useState
	const [input, setInput] = useState('');
	// Se guarda si la expresion es un resultado en una variable useState
	const [esResultado, setEsResultado] = useState(false);
	// Se define una expresion regular (Con ayuda de ChatGPT y https://youtu.be/bgBWp9EIlMM)
	const regex = /[+\-*/]/;

	// Funcion que agrega un numero al input
	const agregaNumero = async (numero) => {
		// Si la expresion es un resultado, se resetea
		if (esResultado) {
			setInput(numero);
			setEsResultado(false);
		}
		// Si el input es 'Error' se resetea
		else if (input === 'Error') {
			setInput(numero);
		}
		else {
			setInput(input + numero);
		}
	}

	// Funcion que elimina un numero del input
	const eliminaNumero = async () => {
		// Se setea EsResultado resultado como false
		setEsResultado(false);
		// Si el input es 'Error' se resetea
		if (input === 'Error') {
			setInput('');
		}
		// Si queda el ultimo decimal, se borra el punto tambien
		else if (input.charAt(input.length - 2) == '.') {
			setInput(input.slice(0, -2));
		}
		// Se elimina un caracter
		else {
			setInput(input.slice(0, -1));
		}
	}

	// Funcion que agrega un operador al input
	const agregaOperador = async (operador) => {
		// Si el input es 'Error' se resetea
		if (input === 'Error') {
			// Se setea EsResultado resultado como false
			setEsResultado(false);
			setInput('');
		}
		// Si el operador es factible, se agrega ( valueOf() con ayuda de ChatGPT)
		else if ((await operadorFactible(operador)).valueOf()) {
			// Se setea EsResultado resultado como false
			setEsResultado(false);
			setInput(input + operador);
		}
	}

	// Funcion que resetea el input
	const resetearExpresion = async () => {
		// Se setea EsResultado resultado como false
		setEsResultado(false);
		setInput('');
	}

	// Funcion que envia la expresion al servidor
	const enviarExpresion = async () => {
		// Si el input no contiene un operador como ultimo caracter,
		// no es nulo y posee al menos un operador, se procesa
		if (!isNaN(input.charAt(input.length - 1)) && input.length != 0 && regex.test(input)) {
			// Si el input incluye suma
			if (input.includes('+')) {
				// Encuentra la posicion de '+'
				let pos = input.indexOf('+');
				// Extrae los numeros del input
				let num1 = input.slice(0, pos);
				let num2 = input.slice(pos + 1);
				// Envia la solicitud al servidor en URL
				fetch('http://localhost:80/suma/' + num1 + '/' + num2)
					// Recibimos la respuesta
					.then(response => response.json())
					.then(data => {
						// Se setea EsResultado resultado como true
						setEsResultado(true);
						// Si el status es error, se setea como error
						if (data.status === 'error') {
							setInput('Error');
							console.error('Error en la operación: ', data.value);
						}
						else {
							// Si el resultado es un entero, se cambia a entero
							let num = parseFloat(data.value).toFixed(2)
							if (num % 1 === 0) {
								setInput(parseInt(num).toString());
							}
							else {
								setInput(num.toString());
							}
						}
					})
					.catch(error => {
						setInput('Error');
						// https://www.tutorialstonight.com/console-error-vs-console-log#:~:text=log-,console.,log%20out%20objects%20using%20console.
						console.error('Error en la solicitud: ', error);
					});
			}
			// Si el input incluye multiplicacion
			else if (input.includes('*')) {
				// Encuentra la posicion de '*'
				let pos = input.indexOf('*');
				// Extrae los numeros del input
				let num1 = input.slice(0, pos);
				let num2 = input.slice(pos + 1);
				// Envia la solicitud al servidor en URL
				fetch('http://localhost:80/multiplicacion/' + num1 + '/' + num2)
					// Recibimos la respuesta
					.then(response => response.json())
					.then(data => {
						// Se setea EsResultado resultado como true
						setEsResultado(true);
						// Si el status es error, se setea como error
						if (data.status === 'error') {
							setInput('Error');
							console.error('Error en la operación: ', data.error);
						}
						// Si el resultado es un entero, se cambia a entero
						else {
							let num = parseFloat(data.value).toFixed(2)
							if (num % 1 === 0) {
								setInput(parseInt(num).toString());
							}
							else {
								setInput(num.toString());
							}
						}
					})
					.catch(error => {
						setInput('Error');
						// https://www.tutorialstonight.com/console-error-vs-console-log#:~:text=log-,console.,log%20out%20objects%20using%20console.
						console.error('Error en la solicitud: ', error);
					});
			}
			// Si el input incluye division
			else if (input.includes('/')) {
				// Encuentra la posicion de '/'
				let pos = input.indexOf('/');
				// Se extraen los numeros del input
				let num1 = input.slice(0, pos);
				let num2 = input.slice(pos + 1);
				// Se envia la solicitud al servidor en formato JSON
				fetch('http://localhost:80/division', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ num1: num1, num2: num2 })
				})
					// Recibimos la respuesta
					.then(response => response.json())
					.then(data => {
						// Se setea EsResultado resultado como true
						setEsResultado(true);
						// Si el status es error, se setea como error
						if (data.status === 'error') {
							setInput('Error');
							console.error('Error en la operación: ', data.value);
						}
						else {
							// Si el numero es entero, se cambia a entero
							let num = parseFloat(data.value).toFixed(2)
							if (num % 1 === 0) {
								setInput(parseInt(num).toString());
							}
							else {
								setInput(num.toString());
							}
						}
					})
					.catch(error => {
						setInput('Error');
						// https://www.tutorialstonight.com/console-error-vs-console-log#:~:text=log-,console.,log%20out%20objects%20using%20console.
						console.error('Error en la solicitud: ', error);
					});
			}
			// Si el input incluye resta
			// Va al final ya que pueden existir numeros negativos en p.ej. una division
			else if (input.includes('-')) {
				// Encuentra la posicion de '-'
				let pos = input.indexOf('-');
				// Si se comienza con un '-' se busca pasado ese
				if (pos === 0) {
					// Se crea una copia del input
					let copia = input.split('');
					// Se cambia el caracter interferencia
					copia[0] = 'X';
					// Si la copia incluye '-' se guarda su pos
					if (copia.includes('-')) {
						pos = copia.indexOf('-');
					}
				}
				// Se extraen los numeros del input
				// Si la pos es 0, se envia un 0 para el primer numero para no enviar vacio
				// Si no, se envian los numeros de forma normal
				if (pos === 0) {
					var num1 = 0;
					var num2 = -input;
				} else {
					var num1 = input.slice(0, pos);
					var num2 = input.slice(pos + 1);
				}
				// Se envia la solicitud al servidor en formato JSON
				fetch('http://localhost:80/resta', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ num1: num1, num2: num2 })
				})
					// Recibimos la respuesta
					.then(response => response.json())
					.then(data => {
						// Se setea EsResultado resultado como true
						setEsResultado(true);
						// Si el status es error, se setea como error
						if (data.status === 'error') {
							setInput('Error');
							console.error('Error en la operación: ', data.value);
						}
						else {
							// Si el numero es entero, se cambia a entero
							let num = parseFloat(data.value).toFixed(2)
							if (num % 1 === 0) {
								setInput(parseInt(num).toString());
							}
							else {
								setInput(num.toString());
							}
						}
					})
					.catch(error => {
						setInput('Error');
						// https://www.tutorialstonight.com/console-error-vs-console-log#:~:text=log-,console.,log%20out%20objects%20using%20console.
						console.error('Error en la solicitud: ', error);
					});
			}
		}
	}

	// Funcion que maneja las condiciones para agregar un operador
	const operadorFactible = async (operador) => {
		// Si el input es vacio, solo se puede agregar un operador '-'
		if ((input.length === 0) && operador === '-') {
			return true;
		}
		// Si el input es 0
		else if (input === '0') {
			return true;
		}
		// Si existe un operador y el largo es 1 no se puede agregar
		else if (input.length === 1 && input.charAt(0) === '-') {
			return false;
		}
		// Si existe un numero y el largo es 1 no se puede agregar
		else if (input.length === 1 && !isNaN(input.charAt(0))) {
			return true;
		}
		// Si el largo es mayor a 1
		else if (input.length > 1) {
			// Si el ultimo caracter es un operador y el anterior no, se puede agregar un operador '-'
			if (isNaN(input.charAt(input.length - 1)) && !isNaN(input.charAt(input.length - 2)) && operador === '-') {
				return true;
			}
			// Si no existe ningun operador en el input se puede agregar (Con ayuda de https://www.w3schools.com/jsref/jsref_regexp_test.asp)
			else if (!regex.test(input.slice(1))) {
				return true
			}
			else {
				console.error('Error: Operación no factible');
				return false
			}
		}
		else {
			console.error('Error: Operación no factible');
			return false
		}
	}

	// Retorna el componente
	return (
		<div className='calculadora'>
			{/* A Visor se le entrega la expresión */}
			<Visor expresion={input} />
			<div className="calculadora-contenedor">
				{/* A los botones se les entrega su caracter y su método al hacer click */}
				<div className='calculadora-teclas'>
					<div className='calculadora-fila'>
						<Boton caracter={'1'} handleButtonClick={agregaNumero} />
						<Boton caracter={'2'} handleButtonClick={agregaNumero} />
						<Boton caracter={'3'} handleButtonClick={agregaNumero} />
					</div>
					<div className='calculadora-fila'>
						<Boton caracter={'4'} handleButtonClick={agregaNumero} />
						<Boton caracter={'5'} handleButtonClick={agregaNumero} />
						<Boton caracter={'6'} handleButtonClick={agregaNumero} />
					</div>
					<div className='calculadora-fila'>
						<Boton caracter={'7'} handleButtonClick={agregaNumero} />
						<Boton caracter={'8'} handleButtonClick={agregaNumero} />
						<Boton caracter={'9'} handleButtonClick={agregaNumero} />
					</div>
					<div className='calculadora-fila'>
						<Boton caracter={'0'} handleButtonClick={agregaNumero} />
						<Boton caracter={'C'} handleButtonClick={resetearExpresion} />
						<Boton caracter={'DEL'} handleButtonClick={eliminaNumero} />
					</div>
				</div>
				<div className='calculadora-operadores'>
					<Boton caracter={'+'} handleButtonClick={agregaOperador} />
					<Boton caracter={'-'} handleButtonClick={agregaOperador} />
					<Boton caracter={'*'} handleButtonClick={agregaOperador} />
					<Boton caracter={'/'} handleButtonClick={agregaOperador} />
				</div>
			</div>
			<div className='calculadora-igual'>
				<BotonGrande caracter={'='} handleButtonClick={enviarExpresion} />
			</div>
		</div>
	);
}