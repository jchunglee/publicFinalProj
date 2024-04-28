import React, { useState } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostPage from './pages/PostPage';
import { Link } from 'react-router-dom';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLightMode, setIsLightMode] = useState(true);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleMode = () => {
        setIsLightMode(prevMode => !prevMode);
    };

    const element = useRoutes([
        {
            path: "/",
            element:<ReadPosts searchTerm={searchTerm} />
        },
        {
            path: "/edit/:id",
            element: <EditPost />
        },
        {
            path:"/new",
            element: <CreatePost />
        },
        {
            path:"/post/:id",
            element: <PostPage />
        }
    ]);

    return (
        <div className={`App ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            <div className="header">
                <h1>Community Games</h1>
                <button className="mode-toggle" onClick={handleToggleMode}>
                    {isLightMode ? 'Dark Mode' : 'Light Mode'}
                </button>
                <Link to="/"><button className="headerBtn">Explore Game Recommendations</button></Link>
                <Link to="/new"><button className="headerBtn">Submit Game Recommendations</button></Link>
                <input type="text" id="searchTerm" placeholder="Search by title" value={searchTerm} onChange={handleSearchTermChange} />
            </div>
            {element}
        </div>
    );
}

export default App;
