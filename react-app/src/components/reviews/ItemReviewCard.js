import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteReview, editReview } from '../../store/reviews';

import styled from "styled-components"

import Button from "../common/Button";
import StarsDisplay from "./StarsDisplay";

const StyledReviewCard = styled.div`
    width: 100%;
    margin-bottom: 6vh;
    span {
        font-size: x-large;
    }
    .review-user-and-date {
        display: flex;
        align-items: center;
        height: 5vh;
        margin-bottom: 0.8vh;
    }
    .profile-icon {
        height: 110%;
        border: 1px solid black;
        margin-right: 0.5vw;
        padding: 5px;
        border-radius: 50%;
    }
    .review-post-date {
        color: grey;
        margin-left: 1vw;
    }
    .review-comment {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: large;
        padding: 0 1vw;
    }
    .review-buttons {
        font-size: 1em;
        margin-left: 1vw;
    }
    .user-rating {
        font-size: .75rem;
    }
    `


const ReviewCard = ({ review, user }) => {
    const dispatch = useDispatch()

    const [buttonDisplay, setButtonDisplay] = useState('base')

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState(review.comment)

    const editSubmit = (e) => {
        e.preventDefault();
        dispatch(editReview({
            reviewId: review.id,
            formDetails: {
                rating,
                comment,
            }
        }))
        setButtonDisplay('base')
    }

    const deleteSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id))
        setButtonDisplay('base')
    }

    return (
        <StyledReviewCard>
            <div className="review-user-and-date">
                <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png" alt=''></img>
                <span className="reviewer-name">{review.user}</span>
                <span className="review-post-date">{new Date(review.createdAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}</span>
                {review.userId === user.id &&
                    <span className='review-buttons'>
                        {buttonDisplay === 'base' &&
                            <>
                                <Button variant="text" type="button" onClick={() => setButtonDisplay('edit')}>Edit</Button>
                                <Button type="button" variant="text" onClick={() => setButtonDisplay('delete')}>Delete</Button>
                            </>}
                        {buttonDisplay === 'edit' &&
                            <Button variant="text" type="button" onClick={() => {
                                setButtonDisplay('base');
                                setComment(review.comment);
                            }}>Cancel Edit</Button>}
                        {buttonDisplay === 'delete' &&
                            <>
                                <form onSubmit={deleteSubmit}>
                                    <Button variant="text" type="button" onClick={() => setButtonDisplay('base')}>Cancel Delete</Button>
                                    <Button type="submit" variant="text" id="confirm-delete">Confirm</Button>
                                </form>
                            </>}
                    </span>}
            </div>
            {buttonDisplay !== 'edit' &&
                <>
                    <StarsDisplay className='user-rating' rating={review.rating} />
                    < div className="review-comment">{review.comment}</div>
                </>}
            {buttonDisplay === 'edit' &&
                <form onSubmit={editSubmit}>
                    <div>
                        <input type="radio" id="one" name="rating" value="1" onChange={(e) => setRating(e.target.value)} required />
                        <label htmlFor="one">1</label>
                        <input type="radio" id="two" name="rating" value="2" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="two">2</label>
                        <input type="radio" id="three" name="rating" value="3" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="three">3</label>
                        <input type="radio" id="four" name="rating" value="4" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="four">4</label>
                        <input type="radio" id="five" name="rating" value="5" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="five">5</label>
                    </div>
                    <div>
                        <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div>
                        <Button type='submit' variant='contained'>Submit</Button>
                    </div>
                </form>}
        </StyledReviewCard>
    )
}

export default ReviewCard
