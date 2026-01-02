import React from 'react';
import PropTypes from 'prop-types';

function SuggestionCard({ title, description, suggestions, sample }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <ul className="suggestions-list">
        {suggestions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {sample && (
        <p className="helper">
          <strong>Suggested phrasing:</strong> {sample}
        </p>
      )}
    </div>
  );
}

SuggestionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sample: PropTypes.string,
};

SuggestionCard.defaultProps = {
  description: '',
  sample: '',
};

export default SuggestionCard;
