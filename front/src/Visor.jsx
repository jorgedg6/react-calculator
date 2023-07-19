import './Visor.css'

// Funcion que retorna el componente visor
export default function Visor({expresion}) {
	return (
        <div className="visor">
            {/* Se muestra la expresion o un 0 */}
            <h1>{expresion || '0'}</h1>
        </div>
    )
}