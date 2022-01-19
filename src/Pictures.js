import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Pictures(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        async function fetchData() { 
            axios({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/apod',
                params: {count: 5, api_key: `${process.env.REACT_APP_API_KEY}`},
            }).then(res =>{
                setPictures(prevPictures => {
                  return [...prevPictures, ...res.data]
                })
                setHasMore(res.data.length > 0)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setError(true)
            })
        }
        fetchData()
    }, [pageNumber])

    return {loading, error, hasMore, pictures}
}





