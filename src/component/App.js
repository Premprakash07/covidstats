import React from 'react-dom';
import '../css/app.css'
import Header from "./Header"
import WorldTable from "./WorldTable"
import Stats from "./Stats"
import Alert from './Alert'

function App() {
  return (
    <div className="app">
      <Alert />
      <Header />
      <div className="opening">
        <Stats/>
        <WorldTable />
      </div>
    </div>
  );
}

export default App;
