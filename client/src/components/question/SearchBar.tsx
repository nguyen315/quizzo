import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

import '../../css/room/searchbar.css';

const SearchBar = () => {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchBar;
