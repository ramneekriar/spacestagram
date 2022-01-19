import React from 'react'
import './Message.css'
import noLikes_image from '../../images/astronaut-liking-posts.png'

function NoLikes() {
    return (
        <div className='noLikes'>
            <div className='noLikes__message'>
                <h1>
                    You haven't liked any posts yet!
                </h1>
                <p>Refresh the page and like some posts to come back and view your very own collection.</p>
            </div>
            <div className="noLikes__image">
                <img src={noLikes_image} alt="Astronaut liking posts on their phone"></img>
            </div>
        </div>
    )
}

export default NoLikes
