import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommitHistoryList from './components/CommitHistoryList';


const App: React.FC = () => {
  return (
    <>
      <CommitHistoryList owner={'facebook'} repo={'react'}/>
      <CommitHistoryList owner={'santoshjoseph99'} repo={'commit-history'}/>
    </>
  );
}

export default App;
