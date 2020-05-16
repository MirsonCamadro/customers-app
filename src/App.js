import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/customers">Customers</Link><br></br>
        <Link to="/customers/30000000">Customers 30.000.000</Link>
      </div>
    </Router>
  );
}

export default App;
