import React, { useState, useEffect } from 'react'
import './Post.css'
import LoadingElement from '../Loading/LoadingElement'
import { Avatar, Button, Box, IconButton, Popover, Tooltip } from '@mui/material'
import { Close, Favorite, FavoriteBorder, SaveAlt } from '@mui/icons-material'
import avatar from '../../images/nasa-logo.jpeg'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function Post({username, imageUrl, title, date, caption, isFav}) {
    const [loaded, setLoaded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(isFav)
    const [copied, setCopied] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const toggleFavorite = () => {
        setIsFavorite(isFavorite => !isFavorite)
    }

    const handleSaveClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const post = {
        username: username,
        title: title,
        date: date,
        caption: caption,
        imageUrl: imageUrl
    }

    useEffect(() => {
        if (isFavorite)
            savePost()
        else
            unSavePost()
    }, [isFavorite])

    function savePost() {
        let data = JSON.stringify(post)
        window.localStorage.setItem(date, data)
    }

    function unSavePost(){
        window.localStorage.removeItem(date)
    }

    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
        setCopied(false)
    }

    return (
        <div className="post">
            <div className='post__header'>
                <Avatar
                    className="post__avatar"
                    alt="Nasa"
                    src={avatar}
                    sx={{ width: 40, height: 40 }}
                />
                <h1 className='post__username'>{username}</h1>
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
            <div className="post__buttons">
                <IconButton type="button" onClick={toggleFavorite} aria-label= {isFavorite ? "unlike image" : "like image"}>
                    { isFavorite ? <Favorite  className="favoriteFilled" fontSize='large'/> : <FavoriteBorder fontSize='large'/>}
                </IconButton >
                <IconButton type="button" aria-label="save image" onClick={handleSaveClick}>
                    <SaveAlt fontSize='large'/>
                </IconButton>
            </div>
            <div>
                <Popover 
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    >
                    <Box
                        p={2} //padding
                        >
                        <div class='close-button'>
                            <IconButton 
                                onClick={handleClose}
                                aria-label="close">
                                <Close fontSize='small'/>
                            </IconButton>
                        </div> 
                        <CopyToClipboard text={imageUrl} onCopy={() => setCopied(true)}>
                            <Tooltip title={copied ? <h3>Copied</h3> : <h3>Click to copy</h3>} placement="top">
                                <Button type="button" aria-label="Copy image link" >{imageUrl}</Button>
                            </Tooltip>
                        </CopyToClipboard>
                    </Box>
                </Popover>
            </div>
            <div>
                <h2 className="post__title">{title}</h2>
                <h3 className="post__date">{date}</h3>
            </div>
            <h2 className="post__text">{caption}</h2>
        </div>
    )
}

export default Post