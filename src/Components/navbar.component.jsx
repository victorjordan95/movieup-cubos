import React from 'react'
import styled   from 'styled-components';

const NavbarStyled = styled.div `
    align-items: center;
    background-color: #116193;
    color: #00e8e4;
    display: flex;
    flex-flow: row wrap;
    font-size: 2rem;
    justify-content: center;
    height: 56px;
    text-align: center;

    .title {
        margin: 0;
    }
`;

const Navbar = () => {
    return <NavbarStyled>
        <h2 className="title">MovieUp - Movies</h2>
    </NavbarStyled>
}

export default Navbar;