import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../../css/questions/searchBar.css';
import { BsSearch, BsX } from 'react-icons/bs';

import '../../css/room/searchbar.css';

const SearchBar = () => {
  return (
    <Form className="d-flex search-bar-form">
      <BsSearch className="search-icon" />

      <input
        type="search"
        placeholder="Search for question title"
        aria-label="Search"
        className="search-bar"
      />
    </Form>
  );
};

export default SearchBar;
