import React from 'react'
import styled   from 'styled-components';

const StyledTag = styled.span `
    background-color: #fff;
    border: 1px solid #116193;
    border-radius: 50px;
    color: #116193;
    margin: 4px;
    padding: 4px 8px;
    @media screen and (min-width: 1024px) {
        margin: 0 8px;
        padding: 4px 8px;
    }

`

const Tag = ({type}) => {
    return <StyledTag>
        {type}
    </StyledTag>
}

export default Tag;