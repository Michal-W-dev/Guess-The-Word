import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import sizes from '../styles/sizes'

const styles = {
    root: {
        textAlign: 'center',
        // border: '1px solid black',
        maxWidth: '75rem',
        marginTop: '2.5rem',
        '& br': {
            [sizes.down('xs')]: { display: 'none' },
        }
    },
    button: {
        fontSize: '2.2rem',
        // padding: '10px 20px',
        width: '5.6rem',
        height: '4.6rem',
        backgroundColor: '#3f51b5',
        color: 'white',
        borderRadius: '12%',
        outline: 'none',
        border: 'none',
        margin: '3px',
        transform: 'skew(-10deg) rotate(-3deg)',
        // boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)',
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
            //
            // transform: 'skew(-40deg) rotateY(50deg) rotateX(30deg) scale(6)',
            // boxShadow: '2px 1px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 0 1px aqua, inset 1px 1px 1px aqua',
            //
            transform: 'skew(-40deg) rotateY(40deg) rotateX(30deg)',
            boxShadow: '2px 2px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 3px aqua',
            color: 'rgb(190, 255, 255)',
            textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
            // transform: 'skew(-30deg) rotateY(40deg)',
            // transform: 'skew(20deg) rotateY(40deg) '
            // transform: 'skew(-10deg) rotate(-3deg) rotateY(5deg)',
        }
    },
    answer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '10%',
        display: 'flex',
        width: 'calc(100% - 180px)',
        justifyContent: 'space-between',
        margin: '0 auto',
        // border: '1px solid red',
        '& button': {
            fontSize: '4rem',
            width: '10rem',
            height: '8.5rem',
            // transform: 'skew(-40deg) rotateY(50deg) rotateX(30deg) scale(0.5)',
            boxShadow: '2px 1px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 0 1px aqua, inset 1px 1px 1px aqua',
            color: 'rgb(190, 255, 255)',
            textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
            zIndex: 9999,
            '&:hover': {
                boxShadow: '1px 1px 0px 1px aqua, 0 1px 2px white, inset -1px -1px 1px aqua',
                textShadow: '1px 1px #1f36b4, 2px 2px 1px aqua, 2px 2px 12px aqua',
                color: 'rgb(160, 255, 255)',
                // boxShadow: '1px 1px 0px 1px black, inset -1px -1px 0px 1px black',
            },
            '&:disabled': {
                background: 'rgba(63, 81, 181,.5)'
            },
        },
    },

}

const Buttons = ({ guessed, handleGuess, classes, answer, isWinner }) => {


    // Change size of displayed buttons, depending of how long the answer is
    const sizeOfButtons = () => (
        answer.length < 7 ? 19 :
            answer.length < 11 ? 16 : 14
    )
    const handleAnswerClick = (evt) => evt.target.disabled = true



    // console.log('isWinner', isWinner)
    const renderAnswerWord = () => {
        return (
            <div className={classes.answer}>
                {answer.split('').map((letter, idx) => (
                    <button
                        className={clsx(classes.button)}
                        key={idx}
                        onClick={handleAnswerClick}
                        style={{
                            // animation: `slide ${(idx + 0.4) * 0.7}s forwards cubic-bezier(0.34, 1.56, 0.64, 1)`,
                            animation: `slide ${(idx + 22) * 0.4}s forwards cubic-bezier(0.34, 1.56, 0.64, 1)`,
                            // transform: `skew(-40deg) rotateY(50deg) rotateX(30deg) scale(${(idx + sizeOfButtons()) * 0.2}`,
                            transform: `skew(-40deg) rotateY(50deg) rotateX(30deg) scale(${(idx + sizeOfButtons()) * 0.12}`,
                        }}
                    > {letter.toUpperCase()}
                    </button>
                ))
                }
            </div >
        )
    }

    return (
        <div className={classes.root}>
            {'qwertyuiopasdfghjkl;zxcvbnm'.split('').map((letter, idx) => (
                <React.Fragment key={letter}>
                    <button
                        className={clsx(classes.button, (idx === 13 || idx === 16) && 'btn-fj')}
                        // key={letter}
                        value={letter}
                        onClick={handleGuess}
                        disabled={guessed.has(letter)}
                    > {letter.toUpperCase()}
                    </button>
                    {(idx === 9 || idx === 19) && <br />}
                </React.Fragment>
            ))}
            {isWinner && renderAnswerWord()}
        </div>
    )
}

export default withStyles(styles)(Buttons)

