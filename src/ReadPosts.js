import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './ReadPosts.css'; // Import the CSS file


const ReadPosts = ({ searchTerm }) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at'); // Default sorting by created_at
    const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .order(sortBy, { ascending: sortOrder === 'asc' });

                if (error) {
                    console.error('Error fetching posts:', error.message);
                } else {
                    let filteredPosts = data;
                    if (searchTerm) {
                        // Filter posts by title if searchTerm is not empty
                        filteredPosts = data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
                    }
                    setPosts(filteredPosts);
                }
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, [searchTerm, sortBy, sortOrder]);

    const handleSortChange = (event) => {
        const { value } = event.target;
        setSortBy(value);
    };

    const handleOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="ReadPosts">
            <div className="sort-options">
                <label>Sort By:</label>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Created Time</option>
                    <option value="upvotes">Upvotes Count</option>
                </select>
                <button onClick={handleOrderChange}>{sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>
            <div className="posts-container">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Link key={post.id} to={`/post/${post.id}`}>
                            <Card
                                id={post.id}
                                title={post.title}
                                created_at={post.created_at}
                                author={post.author}
                                content={post.content}
                                imageUrl={post.imageUrl}
                                upvotes={post.upvotes}
                            />
                        </Link>
                    ))
                ) : (
                    <h2>{searchTerm ? 'No matching posts found' : 'No posts available'}</h2>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;
