import React from 'react'
import './Error.css'
import err_image from '../../images/astronaut.png'
function Error() {
    return (
        <div className="error">
            <div className='error__message'>
                <h1>
                    Oops! Looks like the posts you were trying to reach got lost in space. 
                </h1>
                <p>Refresh the page or try again later.</p>
            </div>
            <div className="error__image">
                <img src={err_image}></img>
            </div>
        </div>
    )
}

export default Error
