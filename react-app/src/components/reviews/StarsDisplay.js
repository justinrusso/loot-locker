import React, { useState } from "react";
import styled from "styled-components";

import full from './images/star-rainbow.png';
import half from './images/star-half.png';
import none from './images/star-grey.png';

const SelectContainer = styled.div`
    width: 12.5rem;
`

const Container = styled.div`
    display: flex;
    align-items: center;

    .full {
        background-image: url(${full});
    }

    .half {
        background-image: url(${half});
    }

    .none {
        background-image: url(${none});
    }
`

const StarDiv = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 2.5em;
    height: 2.5em;
`

const colorCalc = (value, rating) => {
    const compare = rating - value;
    if (compare >= 0) return 'full';
    else if (compare === -0.5) return 'half';
    else return 'none';
}

const StarsDisplay = ({ rating, setRating, disabled, className }) => {

    const [hover, setHover] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const starHover = (e, value) => {
        e.stopPropagation();
        setHoverRating(value);
    }

    if (disabled) {
        return (
            <Container className={className}>
                <StarDiv className={colorCalc(1, rating)}></StarDiv>
                <StarDiv className={colorCalc(2, rating)}></StarDiv>
                <StarDiv className={colorCalc(3, rating)}></StarDiv>
                <StarDiv className={colorCalc(4, rating)}></StarDiv>
                <StarDiv className={colorCalc(5, rating)}></StarDiv>
            </Container >
        )
    }

    return (
        <SelectContainer onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Container>
                <StarDiv className={colorCalc(1, hover ? hoverRating : rating)}
                    onMouseEnter={(e) => starHover(e, 1)}
                    onClick={(e) => setRating(1)}>
                </StarDiv>
                <StarDiv className={colorCalc(2, hover ? hoverRating : rating)}
                    onMouseEnter={(e) => starHover(e, 2)}
                    onClick={(e) => setRating(2)}>
                </StarDiv>
                <StarDiv className={colorCalc(3, hover ? hoverRating : rating)}
                    onMouseEnter={(e) => starHover(e, 3)}
                    onClick={(e) => setRating(3)}>
                </StarDiv>
                <StarDiv className={colorCalc(4, hover ? hoverRating : rating)}
                    onMouseEnter={(e) => starHover(e, 4)}
                    onClick={(e) => setRating(4)}>
                </StarDiv>
                <StarDiv className={colorCalc(5, hover ? hoverRating : rating)}
                    onMouseEnter={(e) => starHover(e, 5)}
                    onClick={(e) => setRating(5)}>
                </StarDiv>
            </Container >
        </SelectContainer>
    )
}

export default StarsDisplay
