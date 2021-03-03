import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// async function
export const getPosts = async (req, res) => {
    try {
        // finding takes time, use 'await'
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    // destructure req.params.id, also rename to _id
    const { id: _id } = req.params;
    const post = req.body;
    
    // check if _id is a valid mongodb ID
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    // set 'new: true' so we receive updated version of the post
    // spread post (...post) and pass in ID
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    // destructure req.params.id, also rename to _id
    const { id: _id } = req.params;

    // check if _id is a valid mongodb ID
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post deleted successfully' });
}