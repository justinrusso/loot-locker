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
    border-radius: 5px;
    position: relative;
    aspect-ratio: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
    }

    .picked-price-tag {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: transparent;
        color: transparent;
        font-weight: bold;
        border-radius: 25px;
        padding: 5px 13px;
        height: fit-content;
        width: fit-content;
        border: 1px solid transparent;
        transition: all 0.2s ease-in-out;
    }

    &:hover .picked-price-tag {
        background-color: white;
        color: black;
        border-color: rgba(24,24,24,0.15);
    }
`

function PickedItem({ item, idx }) {
    return (
        <BoxWrapper to={`/items/${item.id}` } idx={idx}>
            <ItemBox image={item.image}>
                <div className="picked-price-tag">
                    <i className="fas fa-coins" id="coins-icon" /> {item.price}
                </div>
            </ItemBox>
        </BoxWrapper>
    )
}

export default PickedItem;
