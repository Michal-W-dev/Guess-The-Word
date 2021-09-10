import React from 'react'
import Button from '@material-ui/core/Button';

const Buttons = ({ guessed }) => {
    // console.log('Guessed', guessed)
    return (
        <div>
            {"qwertyuiopasdfghjkl;zxcvbnm".split("").map(letter => (
                <Button
                    variant="contained"
                    color="primary"
                    // size='large'
                    key={letter}
                    value={letter}
                    // onClick={handleGuess}
                    // style={{ fontSize: '2.2rem', boxShadow: '1px 1px 1px aqua, 0 0 3px white' }}
                    disabled={guessed.has(letter)}
                > {letter}
                </Button>
            ))}
        </div>
    )
}

export default Buttons
