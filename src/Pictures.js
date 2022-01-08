import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Pictures(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [pictures, setPictures] = useState([])
    useEffect(() => {
        setLoading(true)
        async function fetchData() { 
            axios({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/apod',
                params: {count: 5, api_key: `${process.env.REACT_APP_API_KEY}`}
            }).then(res =>{
                console.log(res.data)
                setPictures(prevPictures => {
                  return [...prevPictures, ...res.data]
                })
                setHasMore(res.data.length > 0)
                setLoading(false)
            })
        }
        fetchData();
    }, [pageNumber])

    return {loading, hasMore, pictures}
}





