import React, { useReducer, useContext } from 'react';
import ChatView from './ChatView';
import Setting from './Setting';
import ContextStore, { rootReducer, initState } from './ContextStore';
import './App.css';

function App() {
  const [appState, dispatch] = useReducer(rootReducer, initState);

  return (
    <ContextStore.Provider value={{ appState, dispatch }}>
      <AppMain />
    </ContextStore.Provider>
  );
}

function AppMain() {
  const { appState } = useContext(ContextStore);
  
  return (
    <div className="app">
      <div className="app-wrap">
        {!!appState.connectStatus ? (
          <div className="chat-wrap">
            <ChatView />
          </div>
        ) : (
          <div className="setting-wrap">
            <Setting />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
