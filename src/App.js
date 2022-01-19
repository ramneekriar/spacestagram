import React, {useState, useEffect, useRef, useCallback} from 'react'
import DocumentTitle from 'react-document-title'
import './App.css'
import Post from './components/Post/Post'
import Pictures from './Pictures'
import LoadingPost from './components/Loading/LoadingPost'
import Error from './components/Message/Error'
import NoLikesMessage from './components/Message/NoLikes'
import { IconButton, Tooltip } from '@mui/material'
import { Home, Favorite, Refresh } from '@mui/icons-material'

function App() {

  const [pageNumber, setPageNumber] = useState(1)
  const [viewLikes, setViewLikes] = useState(false)
  const [postObjects, setPostObjects] = useState([])
  const [noLikes, setNoLikes] = useState(false)

  const {
    loading,
    error,
    hasMore,
    pictures
  } = Pictures(pageNumber)

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
  }, [loading, hasMore])

  function refreshHomePage() {
      window.location.reload(false)
      setViewLikes(false)
  }

  function refreshCurrentPage () {
    if (viewLikes){
      setPostObjects([])
      getLikedPosts()
    }
    else{
      refreshHomePage()
    }
  }

  const toggleViewLikes = () => {
      setViewLikes(true)
  }

  function getLikedPosts () {
    let keys = Object.keys(localStorage)
    if (keys.length === 0){
      setNoLikes(true)
    }
    else{
      setNoLikes(false)
      for(let key of keys){
        let object = JSON.parse(localStorage.getItem(key))
        setPostObjects(prevPostObjects => [...prevPostObjects, object])
      }
    }
  }

  useEffect(() => {
    if (viewLikes)
      getLikedPosts()

  }, [viewLikes])

  return (
    <div className="App">
      <DocumentTitle title='Spacestagram'></DocumentTitle>
      <div className='app__header'>
        <h1 className='app__headerLogo app__nav-item'>Spacestagram</h1>
        <div className='app__nav-item'>
          <IconButton type="button" aria-label="home page" onClick={refreshHomePage}>
              <Tooltip title={<h2>Home</h2>} placement="bottom">
                <Home fontSize='large' />
              </Tooltip>
            </IconButton>
            <IconButton type="button" aria-label="view likes" onClick={toggleViewLikes}>
              <Tooltip title={<h2>My likes</h2>} placement="bottom">
                <Favorite className="favoriteFilled" fontSize='large' />
              </Tooltip>
            </IconButton>
            <IconButton type="button" aria-label="refresh page" onClick={refreshCurrentPage}>
              <Tooltip title={<h2>Refresh page</h2>} placement="bottom">
                <Refresh fontSize='large' />
              </Tooltip>
            </IconButton>
        </div>
      </div>
      <div className='app__allPosts'>
        { viewLikes ? 
        postObjects.map( (likedPost) => {
          return <div className="app__post" key={likedPost.date}>
              <Post 
                username={likedPost.username} 
                imageUrl={likedPost.imageUrl}
                title={likedPost.title} 
                date={likedPost.date} 
                caption={likedPost.caption}
                isFav={true}>
              </Post></div>
        })
        : 
        pictures.map((picture, index) => {
          if (pictures.length === index + 1){
            return <div className="app__post" ref={lastPostRef} key={picture.date}>
              <Post 
                aria-live="polite" 
                aria-busy="false"
                username="NASA" 
                imageUrl={picture.hdurl}
                title={picture.title} 
                date={picture.date} 
                caption={picture.explanation}
                isFav={false}>
              </Post></div>
          } else{
            return <div className="app__post" key={picture.date}>
              <Post 
              aria-live="polite" 
              aria-busy="false"
              username="NASA" 
              imageUrl={picture.hdurl}
              title={picture.title} 
              date={picture.date} 
              caption={picture.explanation}
              isFav={false}>
            </Post></div>
          }
        })}
        <div>{loading && [1, 2, 3, 4, 5].map((n) => <LoadingPost aria-live="polite" aria-busy="true" key={n}/>)}</div>
        <div>{error && <Error />}</div>
        <div>{noLikes && <NoLikesMessage />}</div>
      </div>
    </div>
  )
}

export default App
