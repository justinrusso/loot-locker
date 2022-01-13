import styled from "styled-components";
import { Link } from "react-router-dom";

const BoxWrapper = styled.div`
    a {
        text-decoration: none;
    }
`

const ItemBox = styled.div`
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    height: 200px;
    width: 300px;
    border-radius: 5px;
    margin: 20px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    transition: all 0.2s ease-in-out;

    &:hover {
        filter: drop-shadow(0 0 8px rgba(0,0,0,0.3))
    }

    .price-tag {
        background-color: #D4E9D7;
        color: black;
        font-weight: bold;
        border-radius: 25px;
        padding: 5px 13px;
        height: fit-content;
        width: fit-content;
        border: 1px solid #c7d9ca;
    }
`

function NewItem({ item }) {
    return (
        <BoxWrapper>
            <Link to={`/items/${item.id}`}>
                <ItemBox image={item.image}>
                    <div className="price-tag">
                        <i className="fas fa-coins" id="coins-icon" /> {item.price}
                    </div>
                </ItemBox>
            </Link>
        </BoxWrapper>
    )
}

export default NewItem;
