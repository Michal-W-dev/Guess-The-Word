import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from '../styles/ButtonsStyles'

const Buttons = ({ guessed, handleGuess, classes, answer, isWinner }) => {

    // Change size of displayed buttons, depending of how long the answer is
    const sizeOfButtons = () => (
        answer.length < 7 ? 19 :
            answer.length < 11 ? 16 : 14
    )
    const handleAnswerClick = (evt) => evt.target.disabled = true

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

