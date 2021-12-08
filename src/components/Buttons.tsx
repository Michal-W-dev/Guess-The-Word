import React, { FC, MouseEvent } from 'react'
import clsx from 'clsx';
import { StyledRootDiv } from '../styles/ButtonsStyles'


interface Props {
    isWinner: boolean, answer: string, guessed: Set<string>,
    handleGuess: (evt: MouseEvent) => void
}


const Buttons: FC<Props> = (props) => {
    const { guessed, handleGuess, answer, isWinner } = props;

    // Change size of displayed buttons, depending of how long the answer is
    const sizeOfButtons = () => (
        answer.length < 7 ? 19 :
            answer.length < 11 ? 16 : 14
    )
    const handleAnswerClick = (evt: MouseEvent) => (evt.target as HTMLButtonElement).disabled = true

    // Render animated correct answer (displayed if player guessed all correct letters)
    const renderAnswerWord = () => {
        return (
            <div className='answer'>
                {answer.split('').map((letter, idx) => (
                    <button
                        className='button'
                        key={idx}
                        onClick={handleAnswerClick}
                        style={{
                            animation: `slide ${(idx + 22) * 0.4}s forwards cubic-bezier(0.34, 1.56, 0.64, 1)`,
                            transform: `skew(-40deg) rotateY(50deg) rotateX(30deg) scale(${(idx + sizeOfButtons()) * 0.12}`,
                        }}
                    > {letter.toUpperCase()}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <StyledRootDiv className='root'>
            {'qwertyuiopasdfghjkl;zxcvbnm'.split('').map((letter, idx) => (
                <React.Fragment key={letter}>
                    <button
                        className={clsx('button', (idx === 13 || idx === 16) && 'btn-fj')}
                        value={letter}
                        onClick={handleGuess}
                        disabled={guessed.has(letter)}
                    > {letter.toUpperCase()}
                    </button>
                    {(idx === 9 || idx === 19) && <br />}
                </React.Fragment>
            ))}
            {isWinner && renderAnswerWord()}
        </StyledRootDiv>
    )
}

export default Buttons;