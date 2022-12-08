// Importar modulo
import styled from 'styled-components';

// Importar componente
import ClienteRenglon from './ClienteRenglon';

// Estilos //////////////////////////////////////////////////
const NombreColumnasEstilo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding-top: 10px;

	:first-child {
		padding-left: 10px;
	}
`;

// Componente ///////////////////////////////////////////////////////////////
const ListaClientesRenglones = ({ clientes, mostrarDetallesCliente }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza
	// Si no hay clientes, regresa el parrafo no hay clientes
	if (!clientes.length) return <p>No hay clientes</p>;
	// Si hay clientes regresa los componentes ClienteRenglon por cada uno

	return (
		<>
			<NombreColumnasEstilo>
				{/* Nombres de las columnas en la tabla de clientes */}
				<span>ID</span>
				<span>CLIENTE</span> <span>CONTACTO</span>
			</NombreColumnasEstilo>
			{clientes.map(cliente => (
				<ClienteRenglon
					key={cliente.ID}
					cliente={cliente}
					mostrarDetallesCliente={mostrarDetallesCliente}
				/>
			))}
		</>
	);
};

export default ListaClientesRenglones;
