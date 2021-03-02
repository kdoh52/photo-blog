import React from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";

// selector hook to retrieve data from redux
import { useSelector } from 'react-redux';

import useStyles from "./styles";

export default function Posts({ setCurrentId }) {
    const classes = useStyles();

    // 'state.posts' because of naming in '../../reducers/index.js'
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    
    return (
        // if there are 0 posts, show loading icon
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={posts._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}
