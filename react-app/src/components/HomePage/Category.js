import styled from "styled-components"

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
        transform: scale(1.1);
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
        width: 8vw;
        height: 8vw;
        border: 2px black solid;
        border-radius: 50%;
        margin-bottom: 2vh;
        transition: all 0.2s ease-in-out;
    }
    `

    return (
        <CategoryBlock>
            <a href={path}>
                <img src={source} className="circle"/>
            </a>
            <a href={path}>{name}</a>
        </CategoryBlock>
    )
}

export default Category
