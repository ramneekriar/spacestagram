import React, {useState} from 'react'
import './Post.css'
import LoadingElement from '../Loading/LoadingElement';
import { Avatar, Button, Box, IconButton, Popover, Tooltip } from '@mui/material';
import { Close, Favorite, FavoriteBorder, SaveAlt } from '@mui/icons-material';
import avatar from '../../images/nasa-logo.jpeg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Post({username, imageUrl, title, date, caption}) {
    const [loaded, setLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [copied, setCopied] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleFavorite = () => setIsFavorite(!isFavorite);

    const handleSaveClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
        setCopied(false);
    };

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
            <div className="post__buttons">
                <IconButton onClick={toggleFavorite} >
                    { isFavorite ? <Favorite className="favoriteFilled" fontSize='large'/>: <FavoriteBorder fontSize='large'/>}
                </IconButton>
                <IconButton onClick={handleSaveClick}>
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
                                onClick={handleClose}>
                                <Close fontSize='small'/>
                            </IconButton>
                        </div>
                        <CopyToClipboard text={imageUrl} onCopy={() => setCopied(true)}>
                            <Tooltip title={copied ? <p>Copied</p> : <p>Click to copy</p>} placement="top">
                                <Button>{imageUrl}</Button>
                            </Tooltip>
                        </CopyToClipboard>
                    </Box>
                </Popover>
            </div>
            <div>
                <h4 className="post__title">{title}</h4>
                <h5 className="post__date">{date}</h5>
            </div>
            <h4 className="post__text">{caption}</h4>
        </div>
    )
}

export default Post;

