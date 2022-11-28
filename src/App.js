
import './App.css';
import { inventario } from './inventario.js';
import Homepag from './componentes/Homepag';
function App() {
  console.log(inventario)
  return (
    <div className="App">
      <header className="App-header">
        <nav className='navbar'>
          <h1>Alternova Shop</h1>
        </nav>
        
        
      </header>
      <Homepag></Homepag>
    </div>
  );
}

export default App;
