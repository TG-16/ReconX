
import React from 'react';
import ResultItem from './ResultItem';

const ResultList = ({ results }) => {
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="results-container">
            {results.map((result, index) => (
                <ResultItem key={result.id || index} result={result} />
            ))}
        </div>
    );
};

export default ResultList;
