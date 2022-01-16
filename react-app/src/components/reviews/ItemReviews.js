import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews'

import styled from "styled-components"

import Button from "../common/Button";
import ReviewCard from "./ItemReviewCard";
import StarsDisplay from "./StarsDisplay";
import InputField from "../common/InputField";

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
    #create-comment {
        margin-top: 1.75rem;
        margin-bottom: 1.5rem;
    }
    #ratings-container {
        display: flex;
        align-items: center;

        span {
            margin-left: 1.5rem;
            font-size: 1.15rem;
            color: grey;
        }
    }
    #create-header {
        font-size: 1.25rem;
        margin-bottom: 1rem;
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
    const [loaded, setLoaded] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch(getReviews(itemId)).then(() => setLoaded(true))
    }, [dispatch, itemId])

    const createSubmit = (e) => {
        e.preventDefault();

        if (!rating) {
            setMessage("Don't forget your rating!")
            return
        }

        dispatch(createReview({
            itemId,
            formDetails: {
                rating,
                comment,
            }
        }))
        setShowCreate(false);
        setMessage('')
        setComment('');
        setRating(0);
    }

    const byUpdated = (a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    }

    const seller = useSelector(state => state.items.entities.items[itemId].seller)

    const totalRating = Math.round(useSelector(state => state.reviews.entities.totalRating) * 2) / 2

    const reviews = Object.values(useSelector(state => state.reviews.entities.reviews)).sort(byUpdated)
    const userReviews = [];
    const otherReviews = [];
    for (const review of reviews) {
        if (review.userId === user.id) {
            userReviews.push(review);
        } else {
            otherReviews.push(review);
        }
    }

    if (loaded) return (
        <>
            <StyledReviewsSectionDiv>
                <div id="reviews-div">
                    {!reviewData.count ? <span id="reviews-amt">No Reviews Yet</span> :
                        <>
                            <span id="reviews-amt">{reviews.length === 1 ? '1 Rating' : `${reviews.length} Ratings`}</span>
                            <StarsDisplay className="item-rating" defRating={totalRating} disabled={true} />
                        </>}
                    {user.id !== seller.id && (!showCreate ? <Button variant="outlined" className="make-review" type=' button' onClick={() => setShowCreate(true)}>Add a Review</Button> :
                        <Button className="make-review" type='button' variant="text" onClick={(() => {
                            setShowCreate(false);
                            setComment('');
                            setRating(0);
                            setMessage('');
                        })}>Cancel Review</Button>)}
                </div>
                {showCreate && <form id="create-review-form" onSubmit={createSubmit}>
                    <div id="create-header">
                        <span>How did you like this item?</span>
                    </div>
                    <div id="ratings-container">
                        <StarsDisplay rating={rating} setRating={setRating} setMessage={setMessage} user={seller.username} />
                        <span>{message}</span>
                    </div>
                    <div id="create-comment">
                        <InputField
                            fullWidth
                            label="Comment (Optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            id="create-comment-input"
                            inputProps={{
                                type: "text",
                                as: "textarea",
                                rows: 3,
                            }}
                        />
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

    return (<></>)
}

export default ItemReviews
