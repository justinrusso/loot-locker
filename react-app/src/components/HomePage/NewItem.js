import styled from "styled-components";
import { Link } from "react-router-dom";

const BoxWrapper = styled(Link)`
    text-decoration: none;
    backgroud-color: white;
`

const ItemBox = styled.div`
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    aspect-ratio: 1;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
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
        <BoxWrapper to={`/items/${item.id}`}>
            <ItemBox image={item.image}>
                <div className="price-tag">
                    <i className="fas fa-coins" id="coins-icon" /> {item.price}
                </div>
            </ItemBox>
        </BoxWrapper>
    )
}

export default NewItem;
