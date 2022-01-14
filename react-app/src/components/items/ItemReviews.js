import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews'

import styled from "styled-components"

const StyledReviewsSectionDiv = styled.div`
    margin-top: 5vh;
    #reviews-div {
        height: 6vh;
        display: flex;
        margin-bottom: 4vh;
    }
    #reviews-amt {
        font-size: x-large;
        display: flex;
        align-items: center;
    }
    #reviews-stars-div {
        display: flex;
        align-items: center;
        margin-left: 1vw;
    }
    .star {
        height: 50%;
        padding: 0 1px;
        display: flex;
    }
    #reviews-div > button {
        margin-left: 1.5vw;
        background-color: transparent;
        border: none;
    }
    #reviews-div > button:hover {
        font-weight: bold;
    }
    #create-review-form {
        margin-bottom: 4vh;
    }
    `

const ItemReviews = ({ itemId, user, reviewData }) => {

    const dispatch = useDispatch();

    const [showCreate, setShowCreate] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        dispatch(getReviews(itemId))
    }, [dispatch, itemId])

    const createSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview({
            itemId,
            formDetails: {
                rating,
                comment,
            }
        }))
        setShowCreate(false)
    }

    const byCreated = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    const reviews = Object.values(useSelector(state => state.reviews.entities.reviews)).sort(byCreated)
    const userReviews = [];
    const otherReviews = [];
    for (const review of reviews) {
        if (review.userId === user.id) {
            userReviews.push(review);
        } else {
            otherReviews.push(review);
        }
    }

    return (
        <>
            <StyledReviewsSectionDiv>
                <div id="reviews-div">
                    {!reviewData.count ? <span id="reviews-amt">No Reviews Yet</span> :
                        <>
                            <span id="reviews-amt">{reviewData.count === 1 ? '1 Review' : `${reviewData.count} Reviews`}</span>
                            {/* <div id="reviews-stars-div">
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                            </div> */}
                            <span>{`${reviewData.rating} Stars`}</span>
                        </>}
                    {!showCreate ? <button type='button' onClick={() => setShowCreate(true)}>Add a Review</button> :
                        <button type='button' onClick={(() => setShowCreate(false))}>Cancel Review</button>}
                </div>
                {showCreate && <form id="create-review-form" onSubmit={createSubmit}>
                    <p>Rating</p>
                    <div>
                        <input type="radio" id="one" name="rating" value="1" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="one">1</label>
                        <input type="radio" id="two" name="rating" value="2" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="two">2</label>
                        <input type="radio" id="three" name="rating" value="3" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="three">3</label>
                        <input type="radio" id="four" name="rating" value="4" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="four">4</label>
                        <input type="radio" id="five" name="rating" value="5" onChange={(e) => setRating(e.target.value)} required />
                        <label htmlFor="five">5</label>
                    </div>
                    <div>
                        <label htmlFor="comment">
                            Leave a comment (optional):
                        </label>
                        <div>
                            <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>}
            </StyledReviewsSectionDiv>
            {
                otherReviews.map((review, idx) => {
                    return (
                        <StyledReviewCard key={idx}>
                            <div className="review-user-and-date">
                                <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png" alt=''></img>
                                <span className="reviewer-name">{review.user}</span>
                                <span className="review-post-date">{new Date(review.createdAt).toLocaleDateString(undefined, {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                            </div>
                            <div className="review-star-rating">{`${review.rating} Stars`}</div>
                            <div className="review-comment">{review.comment}</div>
                        </StyledReviewCard>
                    )
                })
            }
        </>
    )
}

export default ItemReviews
