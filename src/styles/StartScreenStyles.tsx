import { styled, keyframes } from '@mui/material/styles';

// Keyframes animations
const textSlideIn = keyframes`
    37% { transform: scale(1) }
    100% { transform: scale(1) }
`
const scaleBg = keyframes`
    100% {
        opacity: 1;
        transform: scale(100);
        background: rgba(0,0,0,.85);
    }
`
const scaleLoader = keyframes`
    5% { transform: translate(-50%,-50%) scale(1) }
    80% { opacity: 1 }
    100% { opacity: 0; transform: translate(-50%,-50%) scale(1) }
`

const loadingEffect = keyframes`
    40% { width: 60% }
    45% { width: 55% }
    100% { width: 97%; transform: scale(1) }
`

// Styles
export const StyledRootDiv = styled('div')`
    position: relative;
    overflow: hidden;
    height:100vh;
    width: 100vw;
    box-shadow: inset 0 0 1px 1px white;
    .text1 {
        position: absolute;
        left: 10%;
        top: 20%;
        font-size: 4.1rem;
        width: 80vw;
        height: 100vh;
        color: grey;
        text-shadow: 1px 1px 1px rgba(0,0,0,.7);
        transform-origin: top left;
        transform: scale(0) rotate(10deg) translate(70%, 30%);
        animation: ${textSlideIn} 2.7s 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .text2 {
        position: absolute;
        left: 10%;
        top: 30%;
        font-size: 4rem;
        width: 80vw;
        height: 100vh;
        color: grey;
        text-shadow: 1px 1px 1px rgba(0,0,0,.7);
        transform-origin: top left;
        transform: scale(0) rotate(10deg) translate(-70%, -30%);
        animation: ${textSlideIn} 2.7s 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .background {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 90px;
        height: 50px;
        border-radius: 90%;
        opacity: 0;
        background: rgba(0,0,0,.85);
        animation: ${scaleBg} 3s forwards;
    }
    .loaderContainer {
        position: absolute;
        bottom: 51%;
        left: 50%;
        text-align: center;
        transform: translate(-50%,-50%) scale(0);
        animation: ${scaleLoader} 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .loaderTitle {
        color: grey;
        text-shadow: 1px 1px 1px rgba(0,0,0,.4);
        font-size: 3rem;
        padding-bottom: 1.1rem;
        letter-spacing: 3px
    }
    .loader {
        border-radius: 10px;
        border: 1px solid black;
        height: 3px;
        width: 31rem;
        div {
            background: linear-gradient(45deg, RebeccaPurple  30%, MediumSlateBlue 60%,  MediumSpringGreen 100%);
            height: 100%;
            width: 0;
            box-shadow: 0 0 1vw #1041ff, 0 0 3vw #1041ff, 0 0 8vw #1041ff, 0 0 8vw #1041ff, 0 0 0.4vw #8bfdfe, -0.1vw 0.1vw 0.1vw #147280, -0.1vw -0.1vw 0.1vw #147280;
            animation: ${loadingEffect} 4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
        }
    }
`