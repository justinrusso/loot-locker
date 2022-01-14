import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews'

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
