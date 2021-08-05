import React from 'react';
import { Form } from 'react-bootstrap';
import { BiFilterAlt } from 'react-icons/bi';
import '../../css/questions/filterBar.css';
import '../../css/questions/searchBar.css';

const FilterBar = () => {
  return (
    <Form className="d-flex filter-bar-form">
      <BiFilterAlt className="search-icon" />

      <input
        type="search"
        placeholder="Enter tag filter"
        aria-label="Search"
        className="search-bar"
      />
    </Form>
  );
};

export default FilterBar;
