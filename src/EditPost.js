import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ title: "", author: "", content: "", imageUrl: "" });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
                if (error) {
                    console.error('Error fetching post:', error.message);
                } else {
                    setPost(data);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditPost = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from('Posts')
                .update(post)
                .eq('id', id);
            console.log("Post updated successfully!");
            window.location.href = `/post/${id}`;
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    return (
        <div className="edit-post-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleEditPost}>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br /><br />

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br /><br />

                <label htmlFor="content">Content</label><br />
                <textarea id="content" name="content" value={post.content} onChange={handleChange} /><br /><br />

                <label htmlFor="imageUrl">Image URL</label><br />
                <input type="text" id="imageUrl" name="imageUrl" value={post.imageUrl} onChange={handleChange} /><br /><br />

                <input type="submit" value="Save" />
            </form>
        </div>
    );
};

export default EditPost;
