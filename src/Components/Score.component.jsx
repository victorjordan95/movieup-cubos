import React from 'react'
import styled   from 'styled-components';

const ScoreStyled = styled.div `
    align-items: center;
    background-color: #116193;
    border-radius: 50%;
    position: relative;
    bottom: ${props => props.width}px;
    display: flex;
    flex-flow: column wrap;
    height: ${props => props.width}px;
    justify-content: center;
    left: 36px;
    width: ${props => props.width}px;

    .score-amout {
        align-items: center;
        border: 4px solid #09e8e4;
        border-radius: 50%;
        color: #09e8e4;
        display: flex;
        flex-flow: column;
        height: ${props => props.width - 10}px;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 100;
        width: ${props => props.width - 10}px;
    }

`

const Score = ({score, width}) => {
    return <ScoreStyled width={width}>
        <span className="score-amout">{score}%</span>
    </ScoreStyled>
}

export default Score;