import React from 'react';
import Message from './Message';

const ListMessages = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: 'auto',
        backgroundColor: '#fff',
        height: 500
      }}
    >
      {props.messages?.map((message: any) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default ListMessages;
