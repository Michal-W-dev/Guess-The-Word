import { styled } from '@mui/material/styles';
import sizes from './sizes'


export const StyledRootDiv = styled('div')(({ theme }) => ({
    '.root': {
        margin: '0 auto',
    },
    '.mainContainer': {
        borderRadius: '25px',
        boxShadow: '4px 4px 6px 2px black',
        border: '2px solid white',
        overflow: 'hidden',
        [sizes.down('md')]: {
            boxShadow: 'inset 1px 1px 2px 1px black',
            borderRadius: 0,
            border: 'none',
        },
        transition: '1s height',
        '& .centeredSection': {
            textAlign: 'center',
            maxWidth: '75rem',
            marginTop: '2.5rem',
            marginBottom: '2rem',
            '& br': {
                [sizes.down('xs')]: { display: 'none' },
            },
            '& .guessedWord': {
                letterSpacing: '2rem',
                textTransform: 'uppercase',
                marginTop: '3.5rem',
                marginBottom: '2rem',
                fontFamily: 'Montserrat',
                fontWeight: '300'
            }
        }
    },
    '.headerContainer': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '7rem',
        padding: '0 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& h1': {
            fontFamily: 'Montserrat, Segoe UI',
            fontSize: '3.3rem',
            fontWeight: 400,
            color: theme.palette.primary.light,
            textShadow: '1px 1px black',
        },
        '& p': {
            textAlign: 'right',
            fontSize: '2.5rem',
            color: theme.palette.primary.light,
            svg: {
                [sizes.down('xs')]: { display: 'none' },
            },
            '& span:last-child': {
                marginLeft: '1rem',
                fontSize: '2.6rem',
                fontWeight: 400
            }
        },
        [sizes.up('md')]: {
            boxShadow: 'inset 1px 1px 4px black, inset 0 0 1px 2px white',
        },
    },
    '.main': {
        [sizes.up('md')]: {
            boxShadow: 'inset 1px 1px 4px black, inset 0 -1px 1px 2px white',
        },
        fontSize: '2.1rem',
        color: 'hsl(210, 100%, 96%)',
        textShadow: '1px 1px 1px black, 1px 1px 1px black',
        padding: '1.3rem 3rem 3rem 5rem',
        [sizes.down('md')]: { padding: '1.7rem', },
        '& p': {
            margin: '0.9rem',
        },
        '& input': {
            color: 'white',
            borderRadius: '9px',
            fontSize: '2rem',
            paddingLeft: '2rem',
            width: '12rem',
            boxShadow: 'inset 3px 3px 3px black, 1px 1px 2px 1px black',
            textTransform: 'uppercase',
            border: '1px solid hsl(210, 100%, 90%)',
        },
        '& label': {
            color: 'white',
            fontSize: '2rem',
        },
        '& strong': {
            fontWeight: 400
        },
        '& hr': {
            borderColor: 'rgba(255,255,255,.7)',
            height: '4px',
            borderRadius: '50px',
            background: 'black',
            boxShadow: 'inset 0 1px 1px white',
        }
    },
    '.textField': {
        '& label.Mui-focused': {
            color: 'hsl(210, 100%, 90%)',
        },
        '& .MuiFilledInput-underline:before': {
            borderRadius: '9px',
            width: '95%',
            margin: '0 auto',
        },
        '& .MuiFilledInput-underline:hover:before': {
            borderBottomColor: 'rgba(255,255,255,0.9)',
        },
        '& .MuiFilledInput-underline:after': {
            width: '92.5%',
            margin: '0 auto',
        },
    },

    '.buttonsContainer': {
        maxWidth: '75rem',
        textAlign: 'center',
        '& .btn-next': {
            margin: '1rem 4rem'
        },
        '& button': {
            fontSize: '2rem',
            fontWeight: 100,
            padding: '7px 20px',
            letterSpacing: '2px',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            borderRadius: '5px',
            outline: 'none',
            border: 'none',
            margin: '3px',
            transform: 'skew(-15deg) rotate(-0deg)',
            boxShadow: '1px 1px 1px aqua, 0 0 1px 1px rgba(255,255,255,.9), 2px 2px 3px 1px black',
            cursor: 'pointer',
            transition: '0.1s',
            '&:disabled': {
                background: 'rgba(0,0,0,.1)',
            },
            '&:disabled:hover': {
                transform: 'skew(-15deg) rotate(-0deg)',
                cursor: 'default',
                boxShadow: '1px 1px 1px 0px aqua, 0 1px 2px 1px white, inset 0px 0px 1px aqua, 3px 3px 4px 1px black',
                textShadow: '1px 1px #1f36b4, 1px 1px 1px aqua, 1px 1px 3px aqua',
            },
            '&:hover': {
                transform: 'skew(-31deg) rotateY(25deg) rotateX(20deg) scale(1.01)',
                boxShadow: '1px 1px 0 1px aqua, inset -1px -1px 2px aqua',
                color: 'rgb(190, 255, 255)',
                textShadow: '1px 1px #1f36b4, 1px 1px 1px aqua',
            },
        },
    },
    '.message': {
        padding: '10px',
        marginBottom: '0.5rem',
        '& span': { fontStyle: 'italic' },
        '& .win-msg': {
            fontSize: '3.1rem',
            fontWeight: '600',
            marginLeft: '0.6rem'
        },
        '& .lose-msg': {
            display: 'inline',
            '& > span': {
                fontSize: '3rem',
                marginLeft: '0.5rem',
            },
            '& .correct-answer': {
                fontSize: '2rem',
                marginLeft: '10rem',
                '& span': {
                    fontWeight: '600',
                    letterSpacing: '3px'
                }
            }
        }
    },
    '.definitionsAtEndGame': {
        marginTop: '3rem',
        '& > p': {
            fontWeight: 400
        }
    }
}))
