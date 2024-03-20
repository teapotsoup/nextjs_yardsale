import styled from 'styled-components';

interface Btn1Props{
  width : string,
  height : string
}

export const AnimationBtn1 = styled.button<Btn1Props>`
    box-sizing: border-box;
    border-radius: 3rem;
    background-color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    overflow: hidden;
    padding: 20px;
    position: relative;
    text-decoration: none;
    transition: .2s transform ease-in-out;
    will-change: transform;
    z-index: 0;
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    &::after {
        background-color: #1E88E5;
        border-radius: 3rem;
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%, 0) rotate(10deg);
        transform-origin: top left;
        transition: .2s transform ease-out;
        will-change: transform;
        z-index: -1;
    }

    &:hover::after {
        transform: translate(0, 0);
    }

    &:hover {
        color: white;
        transform: scale(1.05);
        will-change: transform;
    }
`;
