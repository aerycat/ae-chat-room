import React, { useContext } from 'react';
import ContextStore from './ContextStore';

function UserMessage({ name, msg }) {
  return (
    <li className="user">
      <p>
        <span>{name}:&nbsp;</span>
        {msg}
      </p>
    </li>
  );
}
function AuthorMessage({ msg }) {
  return (
    <li className="author">
      <p>{msg}</p>
    </li>
  );
}
function SystemMessage({ msg = '' }) {
  return (
    <li className="system">
      <p>{msg}</p>
    </li>
  );
}

function ChatStatus() {
  const { appState } = useContext(ContextStore);
  return (
    <div className="chat-list">
      <ul>
        {appState.chatData.map((item, index) => {
          const { uuid = '', username = '', msg = '' } = item;
          if (uuid === appState.uuid) {
            return <AuthorMessage msg={msg} key={index} />;
          } else if (uuid === 'system') {
            return <SystemMessage msg={msg} key={index} />;
          } else {
            return <UserMessage name={username} msg={msg} key={index} />;
          }
        })}
      </ul>
    </div>
  );
}

export default ChatStatus;
