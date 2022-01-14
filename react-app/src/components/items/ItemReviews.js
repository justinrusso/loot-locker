import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createView, deleteReview, editReview, getReviews } from '../../store/reviews'

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
    }`

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
        // background-color: green;
        font-size: large;
        padding: 0 1vw;
    }
    `

const ItemReviews = ({ itemId, user, reviewData }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(itemId))
    }, [dispatch, itemId])

    const reviews = Object.values(useSelector(state => state.reviews.entities.reviews)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            <StyledReviewsSectionDiv>
                <div id="reviews-div">
                    {!reviewData.count ? <span id="reviews-amt">No Reviews Yet</span> :
                        <>
                            <span id="reviews-amt">{reviewData.count === 1 ? '1 Review' : `${reviewData.count} Reviews`}</span>
                            <div id="reviews-stars-div">
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                                <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                            </div>
                        </>}
                </div>
            </StyledReviewsSectionDiv>
            {reviews.map(review => {
                return (
                    <StyledReviewCard>
                        <div className="review-user-and-date">
                            <img className="profile-icon" src="https://cdn.discordapp.com/attachments/858135958729392152/931055275056717844/skull.png" alt=''></img>
                            <span className="reviewer-name">{review.user.username}</span>
                            <span className="review-post-date">{review.createdAt}</span>
                        </div>
                        <div className="review-star-rating">{`${review.rating} Stars`}</div>
                        <div className="review-comment">{review.comment}</div>
                    </StyledReviewCard>
                )
            })}
        </>
    )
}

export default ItemReviews
