import { Form } from 'react-bootstrap';
import '../../css/room/searchbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className="room-list-search-bar">
      <div id="room-list">Rooms list</div>
      <Form.Group className="groupInput">
        <Form.Label className="iconInput">
          <FontAwesomeIcon icon={faSearch} />
        </Form.Label>
        <Form.Control
          className="search-bar"
          size="lg"
          type="text"
          placeholder="Search for room title"
        />
      </Form.Group>
    </div>
  );
};

export default SearchBar;
