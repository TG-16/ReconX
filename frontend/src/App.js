
import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import ResultList from './components/ResultList';
import './index.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Step 1: Initiate Search
      const searchResponse = await axios.post('http://localhost:5000/api/search', {
        name: query
      });

      const newTargetId = searchResponse.data.target_id;
      setTargetId(newTargetId);

      // Step 2: Fetch Results
      const resultsResponse = await axios.get(`http://localhost:5000/api/targets/${newTargetId}/results`);

      setResults(resultsResponse.data.results);

    } catch (err) {
      console.error("Search failed:", err);
      setError("Reconnaissance failed. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="glitch" data-text="RECONX">RECONX</h1>
        <p className="subtitle">Advanced Target Intelligence System</p>
      </header>

      <main className="main-content">
        <SearchInput onSearch={handleSearch} loading={loading} />

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading-indicator">Initializing scan protocols...</div>}

        <ResultList results={results} />
      </main>
    </div>
  );
}

export default App;
