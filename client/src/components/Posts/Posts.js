import React from 'react';
import Post from "./Post/Post";

// selector hook to retrieve data from redux
import { useSelector } from 'react-redux';

import useStyles from "./styles";

export default function Posts() {
    const classes = useStyles();

    // 'state.posts' because of naming in '../../reducers/index.js'
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    
    return (
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    )
}
