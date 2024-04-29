import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", author: "", content: "", imageUrl: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPost(prev => ({
                ...prev,
                imageUrl: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const createPost = async (event) => {
        event.preventDefault();

        console.log("Post to be inserted:", post);

        const created_at = new Date().toISOString();

        await supabase
            .from('Posts')
            .insert([{
                title: post.title,
                author: post.author,
                content: post.content,
                imageUrl: post.imageUrl,
                created_at: created_at
            }])
            .select();

        console.log("Post inserted successfully!");

        window.location.href = "/";
    };

    return (
        <div className="create-post-container">
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author</label> <br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br />

                <label htmlFor="content">Content</label><br />
                <textarea id="content" name="content" value={post.content} onChange={handleChange} /><br />
                <br />

                <label htmlFor="imageUrl">Image URL</label><br />
                <input type="text" id="imageUrl" name="imageUrl" value={post.imageUrl} onChange={handleChange} /><br />
                <br />

                <label htmlFor="imageUpload" className="custom-file-input">Choose File</label><br />
                <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={handleImageInputChange} /><br />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    );
};

export default CreatePost;
