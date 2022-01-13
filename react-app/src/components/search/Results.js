import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../store/items'
import ResultCard from './ResultCard'

const CategoryHeader = styled.div`
    width: 100vw;
    height: 150px;
    background-color: #faecd5;
    padding-left: 10%;
    padding-top: 30px;
    font-size: 30px;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    #search-header {
        margin-top: 20px;
        font-weight: bold;
        font-size: 24px;
    }

    #search-count {
        display: flex;
        align-self: flex-end;
        margin: 10px 0px;
        font-size: small;
    }
`

const Grid = styled.ul`
    display: grid;
    margin: 0px;
    padding: 0px;
    grid-template-columns: 1fr 1fr;

    @media (min-width: 1000px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1300px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Results = () => {
    const categories = useSelector(state => state.categories.categories);

    const [isLoaded, setIsLoaded] = useState(false);

    let query = useQuery();
    const categoryId = query.get("category");
    const searchKey = query.get("key");

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems({categoryId, searchKey})).then(() => setIsLoaded(true));
    }, [dispatch, categoryId, searchKey])

    const results = useSelector(state => state.items.entities.items);

    return (
        <Container>
            <Content>
                {isLoaded &&
                    <>
                        {searchKey ?
                            <span id='search-header'>Results for "{searchKey}"</span>
                            :
                            <CategoryHeader>
                                <h3>{categories[categoryId].name}</h3>
                            </CategoryHeader>
                        }
                        <span id='search-count'>{Object.values(results).length === 1 ?
                            '1 result' :
                            `${Object.values(results).length} results`
                        }</span>
                        <Grid>
                            {Object.values(results).map((item, idx) => {
                                return <ResultCard key={idx} item={item} />
                            })}
                        </Grid >
                    </>
                }
            </Content>
        </Container>
    )
}

export default Results
