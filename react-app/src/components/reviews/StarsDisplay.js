import React from "react";
import styled from "styled-components";
import full from './images/star-rainbow.png';
import half from './images/star-half.png';
import none from './images/star-grey.png';

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

const StarsDisplay = ({ rating, className }) => {

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

export default StarsDisplay;
