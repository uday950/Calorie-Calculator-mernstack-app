import React from 'react';
import './App.css';
// import { Login } from './components/login';
import { Nav } from './components/Nav';
import { AppProvider } from './components/context/AppContext'

function App() {
  return (
    <>
      <AppProvider>
        <div className="App">
          {/* <Login /> */}
          <Nav />
        </div>
      </AppProvider>
    </>
  );
}

export default App;
