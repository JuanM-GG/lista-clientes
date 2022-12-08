import ListaClientes from './components/ListaClientes';
import { clientes } from './clientes.js';

const App = () => {
	return <ListaClientes clientesIniciales={clientes} />;
};

export default App;
