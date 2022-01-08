import React, {useState, useEffect} from 'react'
import './App.css';
import Post from './components/Post/Post';
// import axios from 'axios';
import Pictures from './Pictures';

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    loading,
    hasMore,
    pictures
  } = Pictures(pageNumber);


  return (
    <div className="App">
      <div className='app__header'>
        <h1 className='app__headerLogo'>Spacestagram</h1>
      </div>
      {pictures.map(picture =>{
        return <div key={picture.date}><Post 
        username="NASA" 
        imageUrl={picture.hdurl}
        title={picture.title} 
        date={picture.date} 
        caption={picture.explanation}/></div>
      })}
    </div>
  );
}

export default App;
