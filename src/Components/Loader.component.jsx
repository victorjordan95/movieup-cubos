import React from 'react'
import styled   from 'styled-components';

// This component was made by Mr.Tymchuk
// https://codepen.io/MrTymchuk/pen/zpoMgO

const LoaderStyled = styled.div `
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(26, 26, 26, 0.8);

.load-align {
    position: absolute;
    top: 50%;
    left: 50%;

    overflow: hidden;

    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
}

.film {
    position: absolute;
    top: 0;

    width: 60px;
    height: 60px;

    border-top: 10px solid #fff;
    border-right: 2px solid #fff;
    border-bottom: 10px solid #fff;
    border-left: 2px solid #fff;
}

.load-align .film:first-child {
    left: 0;
}

.load-align .film:last-child {
    left: -100%;
}

.film span:nth-child(1) {
    position: absolute;
    top: -8px;
    left: 10px;

    width: 6px;
    height: 6px;

    background: #1a1a1a;
}

.film span:nth-child(1):before {
    position: absolute;
    top: 0;
    left: -10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(1):after {
    position: absolute;
    top: 0;
    left: 10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(2) {
    position: absolute;
    top: -8px;
    left: 40px;

    width: 6px;
    height: 6px;

    background: #1a1a1a;
}

.film span:nth-child(2):before {
    position: absolute;
    top: 0;
    left: -10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(2):after {
    position: absolute;
    top: 0;
    left: 10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(3) {
    position: absolute;
    bottom: -8px;
    left: 10px;

    width: 6px;
    height: 6px;

    background: #1a1a1a;
}

.film span:nth-child(3):before {
    position: absolute;
    bottom: 0;
    left: -10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(3):after {
    position: absolute;
    bottom: 0;
    left: 10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(4) {
    position: absolute;
    bottom: -8px;
    left: 40px;

    width: 6px;
    height: 6px;

    background: #1a1a1a;
}

.film span:nth-child(4):before {
    position: absolute;
    top: 0;
    left: -10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

.film span:nth-child(4):after {
    position: absolute;
    top: 0;
    left: 10px;

    width: 6px;
    height: 6px;

    content: '';

    background: #1a1a1a;
}

@keyframes move {
    50% {
        left: 50%;
    }

    100% {
        left: 100%;
    }
}

@-webkit-keyframes move {
    50% {
        left: 50%;
    }

    100% {
        left: 100%;
    }
}

@-moz-keyframes move {
    50% {
        left: 50%;
    }

    100% {
        left: 100%;
    }
}

@keyframes move2 {
    50% {
        left: -50%;
    }

    100% {
        left: 0;
    }
}

@-webkit-keyframes move2 {
    50% {
        left: -50%;
    }

    100% {
        left: 0;
    }
}

@-moz-keyframes move2 {
    50% {
        left: -50%;
    }

    100% {
        left: 0;
    }
}

.film:first-child {
    -webkit-animation: move 1s infinite .1s;
    -moz-animation: move 1s infinite .1s;
    -ms-animation: move 1s infinite .1s;
    animation: move 1s infinite .1s;
    animation-timing-function: linear;
}

.film:last-child {
    -webkit-animation: move2 1s infinite .1s;
    -moz-animation: move2 1s infinite .1s;
    -ms-animation: move2 1s infinite .1s;
    animation: move2 1s infinite .1s;
    animation-timing-function: linear;
}

`

const Loader = () => <LoaderStyled>
    <div class="load-align">
        <div class="film"><span></span><span></span><span></span><span></span></div>
        <div class="film"><span></span><span></span><span></span><span></span></div>
    </div>
</LoaderStyled>

export default Loader;