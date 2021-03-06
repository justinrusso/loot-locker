import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteReview, editReview } from '../../store/reviews';

import styled from "styled-components"

import Button from "../common/Button";
import StarsDisplay from "./StarsDisplay";
import InputField from "../common/InputField";

const StyledReviewCard = styled.div`
    width: 100%;
    margin-bottom: 5vh;
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
        margin: 1rem;
    }
    #edit-comment {
        margin-left: 1rem;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
    }
    #submit-edit {
        margin-left: 1rem;
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
                rating: rating ? rating : review.rating,
                comment,
            }
        })).then(() => setButtonDisplay('base'))
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
                <span className="review-post-date">{new Date(review.updatedAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}</span>
                {review.userId === user?.id &&
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
                                setRating(0);
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
                    <StarsDisplay disabled={true} className='user-rating' defRating={review.rating} />
                    < div className="review-comment">{review.comment}</div>
                </>}
            {buttonDisplay === 'edit' &&
                <form onSubmit={editSubmit}>
                    <StarsDisplay className='user-rating' rating={rating} defRating={review.rating} setRating={setRating} />
                    <div id="edit-comment">
                        <InputField
                            fullWidth
                            label="Comment (Optional)"
                            value={comment}
                            id="edit-comment-input"
                            onChange={(e) => setComment(e.target.value)}
                            inputProps={{
                                type: "text",
                                as: "textarea",
                                rows: 3,
                            }}
                        />
                    </div>
                    <div id="submit-edit">
                        <Button type='submit' variant='contained'>Save</Button>
                    </div>
                </form>}
        </StyledReviewCard>
    )
}

export default ReviewCard
