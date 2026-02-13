
import React, { useState } from 'react';

const SearchInput = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter target name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? 'Scanning...' : 'Recon'}
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
