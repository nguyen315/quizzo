import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../../css/questions/searchBar.css';
import { HiOutlineFilter } from 'react-icons/hi';

const SearchBar = () => {
  return (
    <Form className="d-flex search-bar-form">
      <input
        type="search"
        placeholder="Enter tag filter"
        aria-label="Search"
        className="search-bar"
      />
      <Button className="search-button">
        <HiOutlineFilter />
      </Button>
    </Form>
  );
};

export default SearchBar;
