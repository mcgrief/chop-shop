import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ bikes, setFilteredBikes }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = bikes.filter((bike) => bike.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredBikes(results);
  };
  return (
    <>
      <input placeholder="Search" value={searchInput} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  setFilteredBikes: PropTypes.func.isRequired,
};
