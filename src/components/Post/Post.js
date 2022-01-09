import React, {useState} from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core';
import LoadingElement from '../Loading/LoadingElement';
import avatar from '../../images/nasa-logo.jpeg';

function Post({username, imageUrl, title, date, caption}) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="post">
            <div className='post__header'>
                <Avatar
                    className="post__avatar"
                    alt="Nasa"
                    src={avatar}
                    sx={{ width: 40, height: 40 }}
                />
                <h3>{username}</h3>
            </div>
            <div className="post__imagewrapper">
                {loaded ? null :
                <div><LoadingElement type="image"/></div>
                }
                <img className="post__image" 
                    style={loaded ? {} : { display: 'none' }} 
                    onLoad={() => setLoaded(true)} 
                    src={imageUrl} 
                    alt={title}>
                </img>
            </div>
            <h4 className="post__title">{title}</h4>
            <h5 className="post__date">{date}</h5>
            <h4 className="post__text">{caption}</h4>
        </div>
    )
}

export default Post;

