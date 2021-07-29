import { Image } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import '../../css/room/addroom.css';

import circle from './circle.png';

const AddRoom = () => {
  return (
    <Card className="add-room">
      <Image className="add-logo" src={circle} roundedCircle />
      <div className="create-a-new-room">Create a new room</div>
    </Card>
  );
};

export default AddRoom;
