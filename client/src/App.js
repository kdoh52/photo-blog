// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memoriesImage from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

import useStyles from "./styles";

function App() {
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
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memoriesImage} alt="memories" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
