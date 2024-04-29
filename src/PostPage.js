import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './PostPage.css';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
                if (error) {
                    console.error('Error fetching post:', error.message);
                } else {
                    setPost(data);
                    setUpvotes(data.upvotes || 0);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    const updateUpvotes = async () => {
        try {
            setUpvotes(upvotes + 1);
            const { error } = await supabase.from('Posts').update({ upvotes: upvotes + 1 }).eq('id', id);
            if (error) {
                console.error('Error updating upvotes:', error.message);
            }
        } catch (error) {
            console.error('Error updating upvotes:', error.message);
        }
    };

    const handleEditPost = () => {
        window.location.href = `/edit/${id}`;
    };

    const handleDeletePost = async () => {
        try {
            await supabase.from('Posts').delete().eq('id', id);
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    return (
        <div className="PostPage">
            {post ? (
                <>
                    <h2 className="title">{post.title}</h2>
                    <h3 className="author">{"by: " + post.author}</h3>
                    {post.imageUrl && <img src={post.imageUrl} alt="Game" className="imageUrl" />}
                    <p className="content">{post.content}</p>
                    <button className="upvotes" onClick={updateUpvotes}>Favorites: {upvotes}</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={handleEditPost} className="editButton">Edit</button>
            <button onClick={handleDeletePost} className="deleteButton">Delete</button> 
        </div>
    );
};

export default PostPage;
