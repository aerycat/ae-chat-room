import React, { useContext } from 'react';
import ContextStore, { actionType } from './ContextStore';
import { createRoomId, createUserName } from './helper';

function Setting() {
  const { appState, dispatch } = useContext(ContextStore);

  return (
    <div className="setting">
      <h3>SETTING:</h3>
      <p>
        <span>name: </span>
        <input
          type="text"
          value={appState.userName}
          onChange={e =>
            dispatch({
              type: actionType.SET_USER_NAME,
              playload: e.target.value.trim().substr(0, 8)
            })
          }
        />
        <button
          onClick={() => {
            dispatch({
              type: actionType.SET_USER_NAME,
              playload: createUserName()
            });
          }}
        >
          random
        </button>
      </p>
      <p>
        <span>channel: </span>
        <input
          type="text"
          value={appState.channel}
          onChange={e =>
            dispatch({
              type: actionType.SET_CHANNEL,
              playload: e.target.value.trim().substr(0, 6)
            })
          }
        />
        <button
          onClick={() =>
            dispatch({
              type: actionType.SET_CHANNEL,
              playload: createRoomId()
            })
          }
        >
          random
        </button>
      </p>
      <p className="s-submit">
        <span className="s-tips">
          name:&nbsp;3~8char.&nbsp;&nbsp;|&nbsp;&nbsp;channel:6char.
        </span>
        <button
          onClick={() => {
            const { userName, channel } = appState;
            if (
              !!userName &&
              !!channel &&
              userName.length >= 3 &&
              channel.length === 6
            ) {
              dispatch({
                type: actionType.SET_CONNECT_STATUS,
                playload: 1
              });
            }
          }}
        >
          submit
        </button>
      </p>
    </div>
  );
}

export default Setting;
