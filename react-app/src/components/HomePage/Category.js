import styled from "styled-components"
import { Link } from "react-router-dom"

const CategoryBlock = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 3vw;
        width: 7vw;

        .category-name {
            text-align: center;
            width: 100%;
            padding-bottom: 5px;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease-in-out;
        }

        &:hover .category-name {
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

        .img-wrapper {
            position: relative;
            padding-top: 100%;
            width: 114px;
            margin: 0 12px;
        }

        .circle {
            width: 114px;
            height: 114px;
            border: 1px solid rgba(150, 150, 150, 0.5);
            border-radius: 50%;
            transition: all 0.2s ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
        }
    `

function Category({ categoryNum, name, source, altText }) {

    return (
        <CategoryBlock>
            <Link to={`search?category=${categoryNum}`}>
                <div className="img-wrapper">
                    <img src={source} className="circle" alt={altText} />
                </div>
            </Link>
            <Link to={`search?category=${categoryNum}`} className="category-name">{name}</Link>
        </CategoryBlock>
    )
}

export default Category
