// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import FiltroListaClientes from './FiltroListaClientes';
import ListaClientesRenglones from './ListaClientesRenglones';
import Encabezado from './Encabezado';
import BarraNavegacion from './BarraNavegacion';
import VentanaEmergenteDetallesCliente from './VentanaEmergenteDetallesCliente';

// Estilos //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo para el componente completo
const ListaClientesEstilo = styled.div`
	width: 800px;
	margin: auto;
	padding: 1rem;
	background-color: yellow;
	border: 4px solid red;

	/* Estilo del layout */
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100px 100px 500px;
	grid-template-areas:
		'Encabezado Encabezado'
		'Nav Nav'
		'Formulario Lista';
`;

// Estilos para el encabezado
const EncabezadoEstilo = styled.header`
	grid-area: Encabezado;
	display: grid;
	align-items: center;
	background-color: lightblue;
	border: 4px solid red;
	text-align: center;
`;

// Estilos para la barra de navegacion
const BarraNavegacionEstilo = styled.nav`
	grid-area: Nav;

	display: grid;
	align-items: center;
	background-color: lightgreen;
	border: 4px solid red;

	> ul {
		/* Permite distribucion horizontal */
		display: flex;
		/* Elimina los puntos */
		list-style: none;
	}

	li {
		padding: 10px;
		border: 4px solid red;
		margin: 0 40px 0 40px;
	}
`;

// Estilos para el formulario de filtrado
const FiltroListaClientesEstilo = styled.div`
	grid-area: Formulario;

	background-color: lightgray;
	border: 4px solid red;
	display: flex;
`;

// Estilos para los renglones de productos
const ListaClientesRenglonesEstilo = styled.section`
	grid-area: Lista;

	overflow: auto;
	background-color: lightpink;
	border: 4px solid red;
`;

// Componente ///////////////////////////////////////////////////////////////////////
const ListaClientes = ({ clientesIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente
	// Custom Hook para crear el estado filters y destructurar sus componentes y su handleFilters
	const { buscar, filtrarPor, ordenarPor, manejarFiltros } = useFiltros();

	// Hook para guardar al empleado seleccionado para mostrar
	// sus detalles
	const [clienteDetalles, setClienteDetalles] = useState({});
	// Custom hook para mostrar los detalles del empleado
	const {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesCliente
	} = useVentanaEmergente(setClienteDetalles);
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Llamar funciones para modificar la lista de usuarios a partir de los datos del formulario
	// 1. Filtrar usuarios por nombre
	let clientesFiltrados = filtrarProductosPorNombre(
		clientesIniciales,
		filtrarPor,
		buscar
	);

	// 3. Ordenar usuarios
	clientesFiltrados = ordenarClientes(clientesFiltrados, ordenarPor);

	// Parte 3. Crear el HTML que se va a renderizar en App
	return (
		// Un estilo para todo el componente
		<ListaClientesEstilo>
			{/* ENCABEZADO */}
			<EncabezadoEstilo>
				<Encabezado />
			</EncabezadoEstilo>
			{/* PANEL DE NEVAGACION */}
			<BarraNavegacionEstilo>
				<BarraNavegacion />
			</BarraNavegacionEstilo>
			{/* CONTENIDO PRINCIPAL */}

			{/* FILTRO DE USUARIOS */}
			<FiltroListaClientesEstilo>
				<FiltroListaClientes manejarFiltros={manejarFiltros} />
			</FiltroListaClientesEstilo>

			{/* LISTA DE USUARIOS */}
			<ListaClientesRenglonesEstilo>
				<ListaClientesRenglones
					clientes={clientesFiltrados}
					mostrarDetallesCliente={mostrarDetallesCliente}
				/>
			</ListaClientesRenglonesEstilo>
			{/* VENTANA EMERGENTE CON DETALLES DE VENTA */}
			<VentanaEmergenteDetallesCliente
				estado={estadoVentanaEmergente}
				cambiarEstado={setEstadoVentanaEmergente}
				clienteDetalles={clienteDetalles}
			/>
		</ListaClientesEstilo>
	);
};
// Funciones /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parte 4. Crear las funciones que generan los custom hooks
// Funcion para crear estado filtros y su API
const useFiltros = () => {
	const [filtros, setFiltros] = useState({
		buscar: '',
		filtrarPor: 0,
		ordenarPor: 0
	});
	const manejarFiltros = (buscar, filtrarPor, ordenarPor) => {
		setFiltros({ buscar, filtrarPor, ordenarPor });
	};

	return {
		...filtros,
		manejarFiltros
	};
};

// Funcion para crear estado users y su API

// Parte 5. Crear las funciones que manipulan los estados
// Funcion para filtrar usuarios por nombre
const filtrarProductosPorNombre = (clientes, campo, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...clientes];
	// Pasa el nombre a buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();

	switch (campo) {
		// Filtrar usuarios por nombre del cliente
		case 0:
			return clientes.filter(cliente =>
				cliente.CLIENTE.toLowerCase().startsWith(minusculaBusqueda)
			);
		// Filtrar usuarios por tipo de venta
		case 1:
			return clientes.filter(cliente =>
				cliente.CONTACTO.toLowerCase().startsWith(minusculaBusqueda)
			);
	}
};

// Función para ordenar los usuarios
const ordenarClientes = (clientes, ordenarPor) => {
	const clientesOrdenados = [...clientes];
	switch (ordenarPor) {
		case 1:
			return clientesOrdenados.sort((a, b) => {
				if (a.CLIENTE > b.CLIENTE) return 1;
				if (a.CLIENTE < b.CLIENTE) return -1;
				return 0;
			});
		case 2:
			return clientesOrdenados.sort((a, b) => {
				if (a.CONTACTO > b.CONTACTO) return 1;
				if (a.CONTACTO < b.CONTACTO) return -1;
				return 0;
			});
		default:
			return clientesOrdenados;
	}
};

// Funcion para crear estado estadoVentanaEmergente y su API
const useVentanaEmergente = setClienteDetalles => {
	// Crear estado
	const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

	// Funcion para cambiar detalles de venta y mostrar los detalles de venta
	const mostrarDetallesCliente = cliente => {
		// El empleado completo se establece como empleadoDetalles
		setClienteDetalles(cliente);

		// Cambiar para mostrar ventana emergente
		setEstadoVentanaEmergente(true);
	};

	return {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesCliente
	};
};

export default ListaClientes;
