import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommitHistoryList from './components/CommitHistoryList';

const App: React.FC = () => {
  return (
    <>
      <CommitHistoryList owner={'santoshjoseph99'} repo={'commit-history'}/>
      <CommitHistoryList owner={'facebook'} repo={'react'}/>
    </>
  );
}

export default App;
