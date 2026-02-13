
import React from 'react';

const ResultItem = ({ result }) => {
    return (
        <div className="result-item">
            <div className="result-header">
                <span className="result-rank">#{result.rank_position}</span>
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="result-title">
                    {result.title}
                </a>
            </div>
            <div className="result-url">{result.url}</div>
            <p className="result-snippet">{result.snippet}</p>
        </div>
    );
};

export default ResultItem;
