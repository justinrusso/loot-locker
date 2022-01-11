import React from 'react'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Results = () => {
    let query = useQuery();

    return (
        <div>
            {query.get("key")}
        </div>
    )
}

export default Results
