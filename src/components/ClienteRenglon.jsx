// Importar modulos
import styled from 'styled-components';
// import { empleados } from '../empleados';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const ClienteRenglonEstilo = styled.div`
	width: 100%;
	background-color: lightblue;
	border: 4px solid red;
	padding: 1rem;
	border-radius: 1rem;
	margin-top: 1rem;
	display: flex;
	justify-content: space-around;
	padding-top: 10px;

	:hover {
		background-color: yellow;
		cursor: pointer;
	}

	span {
		font-size: 12px;
	}
`;

// Componente ////////////////////////////////////////////////////
const ClienteRenglon = ({ cliente, mostrarDetallesCliente }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE
	const { ID, CLIENTE, CONTACTO } = cliente;
	const llamarMostrarDetallesCliente = () => {
		mostrarDetallesCliente(cliente);
	};

	// Parte 2. HTML que se renderiza en UserListRows
	return (
		// Estilo del componente
		<ClienteRenglonEstilo onClick={llamarMostrarDetallesCliente}>
			<span>{Math.floor(ID / 1e31)}</span>
			<span>{CLIENTE}</span>
			<span>{CONTACTO}</span>
		</ClienteRenglonEstilo>
	);
};

export default ClienteRenglon;
