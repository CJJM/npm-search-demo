import React, { useState } from 'react';

import './App.scss';
import Package from './components/Package';

function App() {
  const [searchVal, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const [results, setResults] = useState([]);

  async function handleKeyPress(e) {
    if(e.key === "Enter") {
      e.preventDefault();
      await setResults([]);

      await setError("");
      await setLoading(true);
      await setTimeout(() => search().catch(e => e.message), 500)
    }
  }

  async function search() {
    await setError(null);

    if(!searchVal) {
      await setLoading(false);
      await setError("Please enter your search");
      return;
    }
    const inputVal = searchVal.replaceAll(" ", "+");
    const response = await fetch(`https://api.npms.io/v2/search/suggestions?q=${inputVal}`);
    if(!response.ok) {
      throw new Error("Search failed, please try again");
    }
    const packages = await response.json();
    await setResults([].concat(packages));
    await setLoading(false);
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="app">
      <header>
        <h1>NPM Finder</h1>
      </header>
      <main>
        <form className="search">
          <label htmlFor="search-input">Search</label>
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1
            0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6
            0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg> 
          <input 
            type="search" 
            name="q" 
            id="search-input" 
            placeholder="react" 
            autoFocus
            autoComplete="off"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </form>
        { isLoading && <p className="loading">Loading fetch call with setTimeout</p> }
        { errorVal && <p className="error">{errorVal}</p> }
        { !!results.length &&
          <div className="packages">
            {results.map((elm, i) => (
                <Package key={i} elm={elm} />
            ))}
          </div>
        }
       </main>
    </div>
  );
}

export default App;
