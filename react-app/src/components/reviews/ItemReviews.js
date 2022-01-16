import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews'

import styled from "styled-components"

import Button from "../common/Button";
import ReviewCard from "./ItemReviewCard";
import StarsDisplay from "./StarsDisplay";

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
    .make-review {
        width: 10rem;
    }
    .item-rating {
        margin-left: 1rem;
    }
    `

const ReviewsTitle = styled.div`
    margin-bottom: 3vh;
    font-size: 1.5em;
    color: grey;
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
        setShowCreate(false);
        setComment('');
        setRating(0);
    }

    const byCreated = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    const totalRating = Math.round(useSelector(state => state.reviews.entities.totalRating) * 2) / 2

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
                            <span id="reviews-amt">{reviews.length === 1 ? '1 Rating' : `${reviews.length} Ratings`}</span>
                            <StarsDisplay className="item-rating" defRating={totalRating} disabled={true} />
                        </>}
                    {!showCreate ? <Button variant="outlined" className="make-review" type=' button' onClick={() => setShowCreate(true)}>Add a Review</Button> :
                        <Button className="make-review" type='button' variant="text" onClick={(() => {
                            setShowCreate(false);
                            setComment('');
                            setRating(0);
                        })}>Cancel Review</Button>}
                </div>
                {showCreate && <form id="create-review-form" onSubmit={createSubmit}>
                    <p>Rating</p>
                    <StarsDisplay rating={rating} setRating={setRating} />
                    <div>
                        <label htmlFor="comment">
                            Leave a comment (optional):
                        </label>
                        <div>
                            <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                    </div>
                    <Button variant="contained" type='submit'>Submit</Button>
                </form>}
            </StyledReviewsSectionDiv>
            {
                userReviews.length > 0 && <div>
                    <ReviewsTitle>Your Reviews</ReviewsTitle>
                    {
                        userReviews.map((review, idx) => {
                            return <ReviewCard key={idx} review={review} user={user} />
                        })
                    }
                </div>
            }
            {
                reviews.length > 0 && <div>
                    <ReviewsTitle>Reviews</ReviewsTitle>
                    {
                        otherReviews.map((review, idx) => {
                            return <ReviewCard key={idx} review={review} user={user} />
                        })
                    }
                </div>
            }
        </>
    )
}

export default ItemReviews
