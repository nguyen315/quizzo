import { Form } from 'react-bootstrap';
import '../../css/room/searchbar.css';

const SearchBar = () => {
  return (
    <div className="room-list-search-bar">
      <div id="room-list">Rooms list</div>
      <Form.Control
        className="search-bar"
        size="lg"
        type="text"
        placeholder="Search for room title"
      />
    </div>
  );
};

export default SearchBar;
