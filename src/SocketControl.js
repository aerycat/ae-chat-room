import { Component } from 'react';
import io from 'socket.io-client';
import ContextStore, { actionType } from './ContextStore';

const PORT = process.env.NODE_ENV === 'development' ? 3030 : 4000;

class SocketControl extends Component {
  constructor(props, context) {
    super(props, context);
    this.socket = io(`http://127.0.0.1:${PORT}`, {
      path: '/sockets',
      autoConnect: false,
      reconnectionAttempts: 3
    });
    this.sendMessage = this.sendMessage.bind(this);
    this.operations = this.operations.bind(this);
  }

  static contextType = ContextStore;

  sendMessage() {
    const { appState } = this.context;
    const { channel, userName, chatText, uuid } = appState;
    this.socket.emit('up', {
      uuid,
      type: 2,
      channel,
      username: userName,
      playload: chatText
    });
  }

  operations(event) {
    const { appState, dispatch } = this.context;
    const { channel, userName, uuid } = appState;
    switch (event) {
      case 'leave':
        if (this.socket.connected) {
          this.socket.emit('up', {
            uuid,
            type: 3,
            channel,
            username: userName
          });
        }
        setTimeout(() => {
          dispatch({ type: actionType.SET_CONNECT_STATUS, playload: 0 });
        }, 1500);
        break;
      case 'reconnect':
        if (this.socket.disconnected) {
          this.socket.connect();
        }
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    const { appState, dispatch } = this.context;
    const { channel: curChannel, userName: curName, uuid: curUuid } = appState;
    dispatch({ type: actionType.CLEAN_CHAT_DATA });
    this.socket.on('connect', () => {
      // console.log('Event: ', 'connect');
      this.socket.emit('up', {
        uuid: curUuid,
        type: 1,
        channel: curChannel,
        username: curName
      });
    });
    // this.socket.on('connect_error', () => {
    //   console.log('Event: ', 'connect_error');
    // });
    // this.socket.on('connect_timeout', () => {
    //   console.log('Event: ', 'connect_timeout');
    // });
    // this.socket.on('error', () => {
    //   console.log('Event: ', 'error');
    // });
    this.socket.on('disconnect', () => {
      // console.log('Event: ', 'disconnect');
      dispatch({ type: actionType.SET_CONNECT_STATUS, playload: 3 });
    });
    // this.socket.on('reconnect', () => {
    //   console.log('Event: ', 'reconnect');
    // });
    // this.socket.on('reconnect_attempt', () => {
    //   console.log('Event: ', 'reconnect_attempt');
    // });
    this.socket.on('reconnecting', () => {
      // console.log('Event: ', 'reconnecting');
      dispatch({ type: actionType.SET_CONNECT_STATUS, playload: 1 });
    });
    // this.socket.on('reconnect_error', () => {
    //   console.log('Event: ', 'reconnect_error');
    // });
    this.socket.on('reconnect_failed', () => {
      // console.log('Event: ', 'reconnect_failed');
      dispatch({ type: actionType.SET_CONNECT_STATUS, playload: 3 });
    });
    // this.socket.on('ping', () => {
    //   console.log('Event: ', 'ping');
    // });
    // this.socket.on('pong', () => {
    //   console.log('Event: ', 'pong');
    // });
    this.socket.on('down', pkg => {
      const { uuid, type, username, playload } = pkg;
      const t = Number(type);
      let msg = playload;
      if (!!uuid && !!type && !!username) {
        if (uuid === 'system') {
          const { target: targetUuid = '', msg: sysMsg = '' } = playload;
          msg = sysMsg;
          if (targetUuid === curUuid) {
            if (t === 1) {
              dispatch({ type: actionType.SET_CONNECT_STATUS, playload: 2 });
            } else if (t === 3) {
              this.socket.disconnect();
            }
          }
        }
        dispatch({
          type: actionType.ADD_CHAT_DATA,
          playload: { uuid, username, msg }
        });
      }
    });
    this.socket.connect();
  }

  componentWillUnmount() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket = null;
  }

  render() {
    return null;
  }
}

export default SocketControl;
