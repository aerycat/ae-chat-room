import React, { useRef } from 'react';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import ChatStatus from './ChatStatus';
import SocketControl from './SocketControl';

function Setting() {
  const socketControl = useRef(null);

  return (
    <React.Fragment>
      <SocketControl ref={socketControl} />
      <ChatList />
      <ChatInput
        sendMessages={() =>
          socketControl && socketControl.current.sendMessage()
        }
      />
      <ChatStatus
        operations={event =>
          socketControl && socketControl.current.operations(event)
        }
      />
    </React.Fragment>
  );
}

export default Setting;
