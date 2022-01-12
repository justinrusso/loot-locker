import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ResultLi = styled.li`

    list-style: none;
    margin: 15px;

    a {
        display: flex;
        flex-direction: column;
        text-decoration: none;
    }

    a:hover img {
        box-shadow: 0px 0px 10px #999999;
    }

    a img {
        transition: box-shadow .25s;
    }

    img {
        width: 300px;
        height: 250px;
        object-fit: cover;
        margin-bottom: 10px;
    }

    span {
        margin-top: 2.5px;
    }
`

const ItemName = styled.span`
    color: black;
`

const ItemPrice = styled.span`
    font-weight: bold;
    color: black;
`

const ItemUser = styled.span`
    font-size: small;
    color: grey;
`

const ResultCard = ({ item }) => {
    return (
        <ResultLi>
            <Link to={`/items/${item.id}`}>
                <img src={item.image} alt={item.name} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                <ItemUser>{item.seller.username}</ItemUser>
            </Link>
        </ResultLi>
    )
}

export default ResultCard;
