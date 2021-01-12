import React from 'react'
import Panel from './components/panel'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Particles from 'react-particles-js';


function App() {
 

  return (
    <div className="App">
      <Particles
      className="bg" 
        params={{
          particles: {
            line_linked: {
              color: "#3CA9D1"
            }
          }
        }}/>
        <div >
          <Panel/>  
        </div>
    </div>
  );
}

export default App;
