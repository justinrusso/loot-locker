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
        width: 400px;
        height: 300px;
        object-fit: cover;
        margin-bottom: 10px;
    }

    span {
        color: black;
    }
`

const ItemName = styled.span`

`

const ItemPrice = styled.span`

`

const ItemUser = styled.span`

`

const ResultCard = ({ item }) => {
    return (
        <ResultLi>
            <Link>
                <img src={item.image} alt={item.name} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                <ItemUser>User</ItemUser>
            </Link>
        </ResultLi>
    )
}

export default ResultCard;
