import { styled } from '@mui/material/styles';
import sizes from './sizes'


// Styles
export const StyledRootDiv = styled('div')(({ theme }) => ({
    '.button': {
        fontSize: '2.2rem',
        width: '5.7rem',
        height: '4.7rem',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: '12%',
        outline: 'none',
        border: 'none',
        margin: '3px',
        transform: 'skew(-10deg) rotate(-3deg)',
        boxShadow: '1px 1px 1px aqua, 0 0 1px 1px rgba(255,255,255,.9), 2px 2px 2px 2px black',
        cursor: 'pointer',
        transition: '1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        [sizes.down('md')]: {
            width: '4.5rem', height: '3.5rem'
        },
        '&.btn-fj::after': {
            content: '""',
            display: 'block',
            height: '1px',
            width: '2rem',
            backgroundColor: 'white',
            margin: '0 auto',
            [sizes.down('xs')]: { display: 'none' },
        },
        '&:disabled': {
            background: 'rgba(0,0,0,.1)'
        },
        '&:hover': {
            transform: 'skew(-40deg) rotateY(40deg) rotateX(30deg)',
            boxShadow: '2px 2px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 3px aqua',
            color: 'rgb(190, 255, 255)',
            textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
        }
    },
    '.answer': {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '10%',
        display: 'flex',
        width: 'calc(100% - 180px)',
        justifyContent: 'space-between',
        margin: '0 auto',
        '& button': {
            fontSize: '4rem',
            width: '10rem',
            height: '8.5rem',
            boxShadow: '2px 1px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 0 1px aqua, inset 1px 1px 1px aqua',
            color: 'rgb(190, 255, 255)',
            textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
            zIndex: 9999,
            '&:hover': {
                boxShadow: '1px 1px 0px 1px aqua, 0 1px 2px white, inset -1px -1px 1px aqua',
                textShadow: '1px 1px #1f36b4, 2px 2px 1px aqua, 2px 2px 12px aqua',
                color: 'rgb(160, 255, 255)',
            },
            '&:disabled': {
                background: 'rgba(63, 81, 181,.5)'
            },
        },
    },
}))
