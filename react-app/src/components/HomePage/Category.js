import styled from "styled-components"
import { Link } from "react-router-dom"

function Category({ path, name, source }) {
    const CategoryBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3vw;
    width: 7vw;

    &:hover {
        border-bottom: 2px solid black;
    }

    &:hover .circle {
        transform: scale(1.08);
        filter: drop-shadow(0 1vh 1vh rgba(0,0,0,0.3))
    }

    &:hover a {
        color: #595959
    }

    a {
        color: black;
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
    }

    .circle {
        width: 114px;
        height: 114px;
        border: 2px black solid;
        border-radius: 50%;
        margin-bottom: 2vh;
        transition: all 0.2s ease-in-out;
    }
    `

    return (
        <CategoryBlock>
            <Link href={path}>
                <img src={source} className="circle"/>
            </Link>
            <Link href={path}>{name}</Link>
        </CategoryBlock>
    )
}

export default Category
