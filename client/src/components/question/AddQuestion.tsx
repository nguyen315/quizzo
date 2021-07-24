import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import addIcon from '../../assets/plus-circle-fill.svg';

const AddQuestion: React.FC = () => {
  return (
    <>
      {/* <OverlayTrigger placement="left" overlay={<Tooltip></Tooltip>}> */}
      <Button>Create new question</Button>
      {/* </OverlayTrigger> */}
    </>
  );
};

export default AddQuestion;
