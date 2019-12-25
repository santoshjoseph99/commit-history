import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// const useGithubRepoApi = () => {
// }

enum LinkType {
  next = 'next',
  prev = 'prev',
  first = 'first',
  last = 'last'
}

/**
 * 
 * @param links example: [
 *  '<https://api.github.com/repositories/10270250/commits?page=4>; rel="next"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=423>; rel="last"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=1>; rel="first"', 
 *  ' <https://api.github.com/repositories/10270250/commits?page=2>; rel="prev"'
 *  ]
 * @param linkType 
 */
const getLink = (links: string[], linkType: LinkType): string => {
  for (const l of links) {
    const linkParts = l.split(';');
    const linkTypes = linkParts[1].split('=');
    const relPartIdx = linkTypes[1].indexOf(linkType);
    if (relPartIdx > -1) {
      const u1 = linkParts[0].trim().substring(1);
      return u1.substring(0, u1.length - 1);
    }
  }
  return '';
}

interface Commit {

}

const App: React.FC = () => {
  const [history, setHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [allLinks, setAllLinks] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [url, setUrl] = React.useState('https://api.github.com/repos/facebook/react/commits');
  const onPrevClick = React.useCallback(() => setUrl(getLink(allLinks, LinkType.prev)), [allLinks]);
  const onNextClick = React.useCallback(() => setUrl(getLink(allLinks, LinkType.next)), [allLinks]);
  const onFirstClick = React.useCallback(() => setUrl(getLink(allLinks, LinkType.first)), [allLinks]);
  const onLastClick = React.useCallback(() => setUrl(getLink(allLinks, LinkType.last)), [allLinks]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(url);
        const data = await response.json();
        const linkHeader = response.headers.get('Link') || '';
        const links: any = linkHeader.split(',');
        setAllLinks(links);
        setHistory(data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <Container>
      {isError && <div className='error'>Error: Could not retrieve commits...</div>}
      <>
        <Row className={'navGroup'}>
          <Col><Button disabled={!getLink(allLinks, LinkType.first)} onClick={onFirstClick}>First</Button></Col>
          <Col><Button disabled={!getLink(allLinks, LinkType.prev)} onClick={onPrevClick}>Prev</Button></Col>
          <Col><Button disabled={!getLink(allLinks, LinkType.next)} onClick={onNextClick}>Next</Button></Col>
          <Col><Button disabled={!getLink(allLinks, LinkType.last)} onClick={onLastClick}>Last</Button></Col>
        </Row>
        <Row className={'spinners'}>
          {isLoading &&
            <>
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </>}
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Message</th>
                <th>Author</th>
                <th>SHA</th>
              </tr>
            </thead>
            <tbody>
              {history.map((x: any) => {
                const commit = x.commit;
                const author = x.author;
                const d = new Date(commit.author.date);
                const commitMessage = commit.message.substring(0, 100);

                return (
                  <tr key={x.sha}>
                    <td><span className={'date'}>{d.toDateString()}</span></td>
                    <td>
                      {commitMessage.length === 100 ?
                        <OverlayTrigger
                          placement="auto"
                          delay={{ show: 100, hide: 100 }}
                          overlay={<Tooltip id={x.sha}>{commit.message}</Tooltip>}
                        >
                          <span className={'commit'}>
                            {commitMessage}<span>...</span>
                          </span>
                        </OverlayTrigger>
                        :
                        <span className={'commit'}>
                          {commitMessage}
                        </span>
                      }
                    </td>
                    <td>{author &&
                      <>
                        {author.avatar_url &&
                          <Image className={'avatar'} height={20} width={20} src={author.avatar_url} rounded />}
                        <span className={'author'}>{author.login}</span>
                      </>}
                    </td>
                    <td>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 100, hide: 100 }}
                        overlay={<Tooltip id={x.sha}>{x.sha}</Tooltip>}
                      >
                        <span className={'sha'}>{x.sha.substring(0, 7)}</span>
                      </OverlayTrigger>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Row>
      </>
    </Container>
  );
}

export default App;
