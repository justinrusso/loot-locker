import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, editReview } from '../../store/reviews'

import styled from "styled-components"


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
    .review-star-rating {
        padding: 0 1vw;
        display: flex;
        align-items: center;
        height: 5vh;
    }
    .star {
        height: 50%;
        padding: 0 1px;
        display: flex;
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
    `


const ReviewCard = ({ review, user }) => {

    const dispatch = useDispatch()

    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

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
        setShowEdit(false)
    }

    const deleteSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id))
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
                    <span>
                        {!showEdit ? <button type="button" onClick={() => setShowEdit(true)}>Edit</button> :
                            <button type="button" onClick={() => {
                                setShowEdit(false);
                                setComment(review.comment)
                            }}>Cancel</button>
                        }
                        {!showDelete ? <button type="button" onClick={() => setShowDelete(true)}>Delete</button> :
                            <>
                                <button type="button" onClick={() => setShowDelete(false)}>Cancel</button>
                                <form onSubmit={deleteSubmit}>
                                    <button type="submit">Confirm</button>
                                </form>
                            </>
                        }
                    </span>}
            </div>
            <form onSubmit={editSubmit}>
                {!showEdit ? <div className="review-star-rating">{`${review.rating} Stars`}</div> :
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
                }
                {!showEdit ? <div className="review-comment">{review.comment}</div> :
                    <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                }
                <div>
                    {showEdit && <button type='submit'>Submit</button>}
                </div>
            </form>
        </StyledReviewCard>
    )
}

export default ReviewCard
