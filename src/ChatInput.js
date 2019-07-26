import React, { useContext } from 'react';
import ContextStore, { actionType } from './ContextStore';

function ChatInput({ sendMessages = null }) {
  const { appState, dispatch } = useContext(ContextStore);
  return (
    <div className="chat-input">
      <span className="c-i-name">{appState.userName}</span>
      <input
        className="c-i-text"
        onKeyPress={e => e.key === 'Enter' && sendMessages()}
        onChange={e =>
          dispatch({
            type: actionType.SET_CHAT_TEXT,
            playload: e.target.value.trim().substr(0, 60)
          })
        }
      />
      <button className="c-i-submit" onClick={e => sendMessages()}>
        submit
      </button>
    </div>
  );
}

export default ChatInput;
