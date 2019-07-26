import React, { useContext } from 'react';
import ContextStore from './ContextStore';
import { getStatusProperty } from './helper';

function ChatStatus({ operations = null }) {
  const { appState } = useContext(ContextStore);
  const { tips, icon } = getStatusProperty(appState.connectStatus);
  return (
    <div className="chat-status">
      <div className="c-s-channel">
        channel:&nbsp;<span>{appState.channel}</span>
        <button
          className="c-s-leave"
          onClick={() => operations && operations('leave')}
        >
          leave
        </button>
        <button
          className="c-s-reconnect"
          onClick={() => operations && operations('reconnect')}
        >
          reconnect
        </button>
      </div>
      <div className="c-s-status">
        status:&nbsp;<span>{tips}</span>
        <i className={`c-s-circle c-s-${icon}`} />
      </div>
    </div>
  );
}

export default ChatStatus;
