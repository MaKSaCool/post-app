import React from 'react';
import { ListGroup } from 'reactstrap';

import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    
    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return(
            <li className='list-group-item' key={id}>
                <PostListItem 
                    {...itemProps} // label={item.label} important={item.important}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                />
            </li>
        );
    });

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    );
};

export default PostList;