import React from 'react';
import logo from './logo.svg';
import './App.css';

const useGithubRepoApi = () => {

}

const splitLinks = (links:string): string[] => {
  return links.split(',');
}

enum LinkType {
  next = 'next',
  prev = 'prev'
}

const getLink = (links:string[], linkType:LinkType): string => {
  for(const l of links) {
    const linkParts = l.split(';');
    const linkTypes = linkParts[1].split('=');
    const relPartIdx = linkTypes[1].indexOf(linkType);
    if(relPartIdx > -1) {
      return linkParts[0];
    }
  }
  return '';
}

const App: React.FC = () => {
  const [commits, setCommits] = React.useState({ commits: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [nextLink, setNextLink] = React.useState('');
  const [prevLink, prevNextLink] = React.useState('');
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch('https://api.github.com/repos/facebook/react/commits');
      const data = await response.json(); 
      console.log(response.headers.get('Link'));
      console.log('DATA:', data.length);
      const linkHeader = response.headers.get('Link') || '';
      const links = splitLinks(linkHeader);
      console.log(getLink(links, LinkType.next));
      console.log(getLink(links, LinkType.prev));
      setCommits(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
