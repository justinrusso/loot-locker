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
            border: 2px black solid;
            border-radius: 50%;
            transition: all 0.2s ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
        }
    `

function Category({ path, name, source }) {

    return (
        <CategoryBlock>
            <Link href={path}>
                <div className="img-wrapper">
                    <img src={source} className="circle"/>
                </div>
            </Link>
            <Link href={path} className="category-name">{name}</Link>
        </CategoryBlock>
    )
}

export default Category
