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

const ItemReviews = ({ itemId }) => {

    const { itemId } = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAnItem())
    }, [itemId])

    return (
        <>
            <StyledReviewsSectionDiv>
                <div id="reviews-div">
                    <span id="reviews-amt">50 shop reviews</span>
                    <div id="reviews-stars-div">
                        <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                        <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                        <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                        <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                        <img className="star" src="https://cdn.discordapp.com/attachments/858135958729392152/930955253296267285/star-rainbow.png" alt=''></img>
                    </div>
                </div>
            </StyledReviewsSectionDiv>
        </>
    )
}

export default ItemReviews
