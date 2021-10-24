import React from 'react'
import logo from './logo.svg';
import './App.css';
import DeathStar from './DeathStar';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{!data ? "Loading..." : data}</p>
        <DeathStar></DeathStar>
      </header>
    </div>
  );
}

export default App;
