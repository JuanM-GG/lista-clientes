// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaClientesEstilo = styled.form`
	padding: 1rem;
	align-items: center;
	justify-content: center;

	/* Estilo del layout */
	display: grid;
	grid-gap: 10px;
	grid-template-rows: 0.2fr 1fr 1fr;
	grid-template-areas:
		'Nombre'
		'Ordenar'
		'Buscar';
`;

// Estilo para la entrada de texto
const BuscarNombreEstilo = styled.div`
	grid-area: Nombre;
	display: grid;
	grid-gap: 15px;
`;

const SeleccionarOrdenEstilo = styled.div`
	grid-area: Ordenar;
	display: grid;
	grid-gap: 15px;
`;

const DescargarClientesEstilo = styled.div`
	grid-area: Buscar;

	button {
		height: 60px;
	}
`;

// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaClientes = ({ manejarFiltros }) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			filtrarPor: 0,
			ordenarPor: 0
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado
	// Observar el valor de las entradas
	const { buscar, filtrarPor, ordenarPor } = watch();

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);
	};
	// Usamos la data en el formulario para cambiar el estado de filtros
	useEffect(() => {
		manejarFiltros(buscar, filtrarPor, ordenarPor);
	}, [buscar, filtrarPor, ordenarPor]);

	// Parte 3. HTML que va a ser renderizado
	return (
		<FiltroListaClientesEstilo onSubmit={handleSubmit(onSubmit)}>
			{/* BUSCAR POR NOMBRE EMPLEADO */}
			<BuscarNombreEstilo>
				<label htmlFor='filtrarPor'>BUSCAR COINCIDENCIA:</label>
				<select
					id='filtrarPor'
					{...register('filtrarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por nombre cliente</option>
					<option value='1'>Por nombre contacto</option>
				</select>
				<input type='text' {...register('buscar')}></input>
			</BuscarNombreEstilo>

			{/* SELECT PARA SELECCIONAR ORDEN */}

			<SeleccionarOrdenEstilo>
				<label>ORDENAR TABLA: </label>
				<select
					{...register('ordenarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por defecto</option>
					<option value='1'>Por nombre cliente</option>
					<option value='2'>Por nombre contacto</option>
				</select>
			</SeleccionarOrdenEstilo>
			{/* BOTON PARA BUSCAR USUARIOS */}
			<DescargarClientesEstilo>
				<button type='submit'>Descargar Clientes</button>
			</DescargarClientesEstilo>
		</FiltroListaClientesEstilo>
	);
};

export default FiltroListaClientes;
