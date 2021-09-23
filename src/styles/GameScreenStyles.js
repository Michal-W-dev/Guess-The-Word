import sizes from './sizes'

const styles = {
    root: {
        margin: '0 auto',
    },
    container: {
        borderRadius: '25px',
        boxShadow: '4px 4px 6px 2px black',
        border: '2px solid white',
        overflow: 'hidden',
        [sizes.down('md')]: {
            boxShadow: 'inset 1px 1px 2px 1px black',
            borderRadius: 0,
            border: 'none',
        },
        transition: '1s height'
    },
    headerContainer: {
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
            color: 'hsl(200, 100%, 75%)',
            textShadow: '1px 1px black',
        },
        '& p': {
            textAlign: 'right',
            fontSize: '2.5rem',
            color: 'hsl(210, 100%, 80%)',
            '& span': {
                marginLeft: '1rem',
                fontSize: '2.6rem',
                fontWeight: 400
            }
        },
        [sizes.up('md')]: {
            boxShadow: 'inset 1px 1px 4px black, inset 0 0 1px 2px white',
        },
    },
    main: {
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
    textField: {
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
            borderBottom: '2px solid hsl(215, 100%, 60%)',
            width: '93%',
            margin: '0 auto',
        },
        // '& .MuiInput-underline:after': {
        //     borderBottomColor: 'hsl(215, 100%, 50%)',
        // },
        // '& .MuiOutlinedInput-root': {
        //     '& fieldset': {},
        //     '&:hover fieldset': {},
        //     '&.Mui-focused fieldset': {},
        // },
    },

    buttonsContainer: {
        '& button': {
            fontSize: '2rem',
            fontWeight: 100,
            padding: '7px 20px',
            letterSpacing: '2px',
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: '5px',
            outline: 'none',
            border: 'none',
            margin: '3px',
            transform: 'skew(-15deg) rotate(-0deg)',
            boxShadow: '1px 1px 1px aqua, 0 0 1px 1px rgba(255,255,255,.9), 2px 2px 3px 1px black',
            // textShadow: '1px 1px 2px black',
            cursor: 'pointer',
            // transition: '1s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                //
                // transform: 'skew(-40deg) rotateY(50deg) rotateX(30deg) scale(6)',
                // boxShadow: '2px 1px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 0 1px aqua, inset 1px 1px 1px aqua',
                //
                // transform: 'skew(-40deg) rotateY(40deg) rotateX(30deg) scale(1.03)',
                transform: 'skew(-31deg) rotateY(25deg) rotateX(20deg) scale(1.01)',
                // transform: 'skew(-27deg) rotateY(30deg) rotateX(20deg)',

                // boxShadow: '1px 1px 0 1px aqua, 0 0 2px white, inset -1px -1px 2px aqua',
                boxShadow: '1px 1px 0 1px aqua, inset -1px -1px 2px aqua',
                color: 'rgb(190, 255, 255)',
                // textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
                textShadow: '1px 1px #1f36b4, 1px 1px 1px aqua',
                // transform: 'skew(-30deg) rotateY(40deg)',
                // transform: 'skew(20deg) rotateY(40deg) '
                // transform: 'skew(-10deg) rotate(-3deg) rotateY(5deg)',
            },
        },
    },
}

export default styles;