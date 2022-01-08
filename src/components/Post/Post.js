import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core';

function Post({username, imageUrl, title, date, caption}) {
    return (
        <div className="post">
            <div className='post__header'>
                <Avatar
                    className="post__avatar"
                    alt="Nasa"
                    src="./images/nasa-logo.jpeg"
                />
                <h3>{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt={title}></img>
            <h4 className="post__title">{title}</h4>
            <h5 className="post__date">{date}</h5>
            <h4 className="post__text">{caption}</h4>
        </div>
    )
}

export default Post;
