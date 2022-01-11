import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItems } from '../../store/items'
import ResultCard from './ResultCard'

import { results } from './mock-data'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    display: flex;
    justify-content: center;
    max-width: 80%;
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
    let query = useQuery();
    const key = query.get("key")

    const dispatch = useDispatch()

    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         const results = await dispatch(getItems());
    //         console.log(results)
    //     })();
    // }, [key])

    const items = Object.values(results);

    return (
        <Container>
            <Content>
                <Grid>
                    {items.map((item, idx) => {
                        return <ResultCard key={idx} item={item} />
                    })}
                </Grid >
            </Content>
        </Container>
    )
}

export default Results
