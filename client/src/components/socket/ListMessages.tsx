import React from 'react';
import Message from './Message';

const ListMessages = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        width: 'auto',
        backgroundColor: '#fff',
        height: 500,
        overflow: 'scroll'
      }}
    >
      {props.messages?.map((message: any) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default ListMessages;
