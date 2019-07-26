import React from 'react';
import { createUuid } from './helper';

export const actionType = {
  SET_USER_NAME: 'SET_USER_NAME',
  SET_CHANNEL: 'SET_CHANNEL',
  SET_CHAT_TEXT: 'SET_CHAT_TEXT',
  ADD_CHAT_DATA: 'ADD_CHAT_DATA',
  CLEAN_CHAT_DATA: 'CLEAN_CHAT_DATA',
  SET_CONNECT_STATUS: 'SET_CONNECT_STATUS'
};

export const initState = {
  userName: '',
  channel: '',
  chatText: '',
  chatData: [],
  connectStatus: 0,
  uuid: createUuid()
};

export function rootReducer(state, action) {
  switch (action.type) {
    case actionType.SET_USER_NAME:
      return Object.assign({}, state, {
        userName: action.playload
      });
    case actionType.SET_CHANNEL:
      return Object.assign({}, state, {
        channel: action.playload
      });
    case actionType.SET_CHAT_TEXT:
      return Object.assign({}, state, {
        chatText: action.playload
      });
    case actionType.ADD_CHAT_DATA:
      return Object.assign({}, state, {
        chatData: [...state.chatData, action.playload]
      });
    case actionType.CLEAN_CHAT_DATA:
      return Object.assign({}, state, {
        chatData: []
      });
    case actionType.SET_CONNECT_STATUS:
      return Object.assign({}, state, {
        connectStatus: action.playload
      });
    default:
      return state;
  }
}

const ContextStore = React.createContext(null);

export default ContextStore;
