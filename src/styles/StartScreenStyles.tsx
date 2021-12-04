import { createStyles } from '@material-ui/core';

const styles = () => createStyles({
    root: {
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        color: 'white',
        borderRadius: '10px solid red'
    },
    text1: {
        position: 'absolute',
        left: '10%',
        top: '20%',
        fontSize: '4.1rem',
        width: '80vw',
        height: '100vh',
        color: 'grey',
        textShadow: '1px 1px 1px rgba(0,0,0,.7)',
        transformOrigin: 'top left',
        transform: 'scale(0) rotate(10deg) translate(70%, 30%)',
        animation: '$textSlideIn 2.7s 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
    },
    text2: {
        position: 'absolute',
        left: '10%',
        top: '30%',
        fontSize: '4rem',
        width: '80vw',
        height: '100vh',
        color: 'grey',
        textShadow: '1px 1px 1px rgba(0,0,0,.7)',
        transformOrigin: 'top left',
        transform: 'scale(0) rotate(10deg) translate(-70%, -30%)',
        animation: '$textSlideIn 2.7s 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
    },
    "@keyframes textSlideIn": {
        "37%": {
            transform: 'scale(1)'
        },
        "100%": {
            transform: 'scale(1)'
        },
    },
    background: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '90px',
        height: '50px',
        borderRadius: '90%',
        opacity: 0,
        background: 'rgba(0,0,0,.85)',
        animation: '$scale-bg 3s forwards',
    },
    loaderContainer: {
        position: 'absolute',
        bottom: '51%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%,-50%) scale(0)',
        animation: '$scale-loader 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
    },
    loaderTitle: {
        color: 'grey',
        textShadow: '1px 1px 1px rgba(0,0,0,.4)',
        fontSize: '3rem',
        paddingBottom: '1.1rem',
        letterSpacing: '3px'
    },
    loader: {
        borderRadius: '10px',
        border: '1px solid black',
        height: '3px',
        width: '31rem',
        '& div': {
            background: 'linear-gradient(45deg, RebeccaPurple  30%, MediumSlateBlue 60%,  MediumSpringGreen 100%)',
            height: '100%',
            width: '0',
            boxShadow: '0 0 1vw #1041ff, 0 0 3vw #1041ff, 0 0 8vw #1041ff, 0 0 8vw #1041ff, 0 0 0.4vw #8bfdfe, -0.1vw 0.1vw 0.1vw #147280, -0.1vw -0.1vw 0.1vw #147280',
            animation: '$loading-effect 4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
        }
    },
    "@keyframes scale-bg": {
        "100%": {
            opacity: 1,
            transform: 'scale(100)',
            background: 'rgba(0,0,0,.85)',
        },
    },
    "@keyframes scale-loader": {
        "5%": { transform: 'translate(-50%,-50%) scale(1)' },
        "80%": { opacity: 1 },
        "100%": { opacity: 0, transform: 'translate(-50%,-50%) scale(1)' }
    },
    "@keyframes loading-effect": {
        "40%": { width: '60%' },
        "45%": { width: '55%' },
        "100%": { width: '97%', transform: 'scale(1)' }
    },
});

export default styles;