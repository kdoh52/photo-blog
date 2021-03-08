import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from "@material-ui/core";

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "../../styles";


export default function Home() {
    const classes = useStyles();

    // hold current ID for updating posts
    const [currentId, setCurrentId] = useState(null);
    
    // hook to trigger action
    const dispatch = useDispatch();

    useEffect(() => {
        // calls getPosts action
        dispatch(getPosts())
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container>
            <Grid container className={classes.mainContainer} justify="space-between" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
            </Container>
        </Grow>
    )
}
