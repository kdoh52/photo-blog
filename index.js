import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// including limit to manage large image files
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


// adding prefix of 'posts' to all posts.js routes
// MUST SPECIFY ROUTES BELOW CORS
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello')
})

const PORT = process.env.PORT || 5000;

// Connect to the Mongo DB
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Established connection with MongoDB database.')
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});