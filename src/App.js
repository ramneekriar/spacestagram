import React, {useState, useRef, useCallback} from 'react'
import './App.css';
import Post from './components/Post/Post';
import Pictures from './Pictures';
import LoadingElement from './components/Loading/LoadingElement';
import LoadingPost from './components/Loading/LoadingPost';

function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const {
    loading,
    hasMore,
    pictures
  } = Pictures(pageNumber);

  const observer = useRef()
  const lastPostRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore])

  return (
    <div className="App">
      <div className='app__header'>
        <h1 className='app__headerLogo'>Spacestagram</h1>
      </div>
      {pictures.map((picture, index) =>{
        if (pictures.length === index + 1){
          return <div className="app__post" ref={lastPostRef}key={picture.date}><Post 
          username="NASA" 
          imageUrl={picture.hdurl}
          title={picture.title} 
          date={picture.date} 
          caption={picture.explanation}/></div>
        } else{
          return <div className="app__post" key={picture.date}><Post 
          username="NASA" 
          imageUrl={picture.hdurl}
          title={picture.title} 
          date={picture.date} 
          caption={picture.explanation}/></div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{loading && [1, 2, 3, 4, 5].map((n) => <LoadingPost key={n}/>)}</div>
    </div>
  );
}

export default App;
