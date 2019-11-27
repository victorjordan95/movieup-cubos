import React from 'react'
import styled   from 'styled-components';

const CardStyled = styled.div `

`;

const MovieCard = () => {
    return <CardStyled>
        <img src="" alt=""/>
        <div className="card-content">
            
            <header className="card-header">
                <h1 className="title">Thor</h1>
                <h3 className="subtitle">25/10/2017</h3>
                <div className="score">
                    <span>75%</span>
                </div>
            </header>

            <div className="card-body">

            </div>

        </div>
    </CardStyled>
}

export default MovieCard;