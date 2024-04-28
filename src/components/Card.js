import React from 'react';
import './Card.css';
import { supabase } from '../client'; // Import supabase

const Card = (props) => {
  const [count, setCount] = React.useState(props.upvotes || 0); // Initialize count with the provided upvotes value
  
  const updateCount = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the button
    
    // Increment count locally
    setCount(count + 1);

    // Update the "upvotes" column in the database
    await supabase
      .from('Posts')
      .update({ upvotes: count + 1 })
      .eq('id', props.id);
  };

  return (
    <div className="Card">
      <h1 className="title">{props.title}</h1>
      <h3 className="created_at">{"Created: " + props.created_at}</h3>
      <button className="upvotes" onClick={updateCount}>Favorites: {count}</button>
    </div>
  );
};

export default Card;
