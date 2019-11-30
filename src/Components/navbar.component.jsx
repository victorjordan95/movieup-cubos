import React from 'react'
import styled   from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarStyled = styled.nav `
    align-items: center;
    background-color: #116193;
    display: flex;
    flex-flow: row wrap;
    font-size: 2rem;
    justify-content: center;
    height: 56px;
    text-align: center;

    .title {
        color: #00e8e4;
        margin: 0;
        text-decoration: none;
        font-family: 'Abel', sans-serif;
    }
`;

const Navbar = () => {
    return <NavbarStyled>
        <Link to="/" 
        className="title">MovieUp - Movies</Link>
    </NavbarStyled>
}

export default Navbar;