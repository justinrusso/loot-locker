// Basic idea for how to render edit form

import React, { useState } from 'react'

// Component will expect an existing item through props

const ReviewEditForm = ({ item }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const updateRating = (e) => {
        setRating(e.target.value)
    };

    return (
        <form>
            <div>
                <label>Rating</label>
                <span>
                    <input type="radio" id="one" checked={rating === "1"} name="rating" value="1" onChange={updateRating} />
                    <label for="one">1</label>
                </span>
                <span>
                    <input type="radio" id="two" checked={rating === "2"} name="rating" value="2" onChange={updateRating} />
                    <label for="two">2</label>
                </span>
                <span>
                    <input type="radio" id="three" checked={rating === "3"} name="rating" value="3" onChange={updateRating} />
                    <label for="three">3</label>
                </span>
                <span>
                    <input type="radio" id="four" checked={rating === "4"} name="rating" value="4" onChange={updateRating} />
                    <label for="four">4</label>
                </span>
                <span>
                    <input type="radio" id="five" checked={rating === "5"} name="rating" value="5" onChange={updateRating} />
                    <label for="five">5</label>
                </span>
            </div>
            <div>
                <label>Comment</label>
                <textarea name="comment" value={comment} onChange={setComment}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form >
    );
}

export default ReviewEditForm
