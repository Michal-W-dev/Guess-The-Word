import React, { useState, useEffect, useContext } from 'react'
import { OptionsContext } from '../context/options.context';
import { withStyles } from '@material-ui/core/styles';
import Buttons from '../components/Buttons'
import MainDrawer from '../components/MainDrawer'
import { arrCategory, arrConstraint, random, genBackground, genGuessedWord } from "../utils"
import TextField from '@material-ui/core/TextField';
import CustomTooltip from '../components/Tooltip'
import useHeightAnimHook from '../hooks/useHeightAnimHook';
import styles from '../styles/GameScreenStyles'


const GameScreen = ({ classes }) => {
    const { maxWrong } = useContext(OptionsContext)
    const [nWrong, setNWrong] = useState(0)
    const [guessedLtr, setGuessedLtr] = useState(new Set())
    const [isWinner, setIsWinner] = useState(false)
    const [lostGame, setLostGame] = useState(false)

    // genBackground(numOfStripes, minSaturation, maxSaturation)
    const [background, setBackground] = useState(genBackground(8, 20, 35))

    const [hint, setHint] = useState({
        msg: " Click 'Left', 'Right' or 'Hint' button to display more messages. Hover over each button to get more information.",
        disabled: { left: false, syllables: false, right: false }
    })

    const [fetchedData, setFetchedData] = useState({
        answer: '',
        constraint: 'null',
        category: 'null',
        tags: 'part-of-speech',
        def: '-',
        numSyllables: 0
    })

    // Destructure (fetchedData & hint) objects
    const { answer, constraint, category, tags, def, numSyllables } = fetchedData;
    const { msg, disabled } = hint;

    // Get height based on main content, updated at (fetchedData, isWinner, lostGame)
    const [height, ref] = useHeightAnimHook(fetchedData, isWinner, lostGame)


    // Fetch data at start and restart of the game
    // - additional fetch is needed to get 'left hint', 'right hint' (for more information look at fetchHint function)
    const getData = () => {
        let constraint = random(arrConstraint);
        let category = random(arrCategory);
        return fetch(`https://api.datamuse.com/words?${constraint}=${category}&max=30&md=dps`)
            .then(res => res.json())
            .then(data => {
                let rand;
                do {
                    rand = random(data)
                } while (rand.word.length < 5 || rand.word.length > 16)

                let tags = rand.tags.join(', ');
                let def = rand.defs || ['no definition is available, try to guess it anyway!'];

                setFetchedData({
                    answer: rand.word,
                    numSyllables: rand.numSyllables,
                    constraint, category, tags, def,
                })
            }).catch((err) => console.log('ERROR!', err))
    }

    // Compare guessed letters to answer, e.g. gu_ss_dWord
    const guessedWord = genGuessedWord(answer, guessedLtr)

    useEffect(() => {
        if (answer) {
            // Set the game to be lost or won depending on met conditions
            if (guessedWord.join('') === answer) setIsWinner(true)
            else if (nWrong >= maxWrong) setLostGame(true)
            // Fetch data at the start of the game
        } else getData()
    }, [answer, guessedWord, guessedLtr, nWrong, maxWrong])


    // Fething hints (most common words appearing to the left or right of the target word).
    // - data cannot be taken from initial fetch
    const fetchHint = (direction, max) => {
        // max - fetch no more than top (max) results e.g. fetch no more than 20 first results
        const context = (direction === 'left') ? 'rc' : 'lc';
        fetch(`https://api.datamuse.com/words?${context}=${answer}&max=${max}`)
            .then(res => res.json())
            .then(data => {
                console.log(data, random(data));
                const nums = new Set();
                let count = 0;
                do {
                    let randWord = random(data).word
                    if (randWord.length > 4) {
                        nums.add(randWord)
                    }
                    count++;
                } while (nums.size < 4 && count < max)
                const updatedDisabled = { ...disabled, [direction]: true }
                setHint({
                    disabled: updatedDisabled,
                    msg: `to the ${direction.toUpperCase()}: ${Array.from(nums).join(', ')}`
                })
            })
    }

    // Handle presssing LEFT ARROW or 'Left' button (fetch random hint taken from top 20 results)
    const handleLeft = () => fetchHint('left', 20)
    // Handle presssing RIGHT ARROW or 'Right' button (fetch random hint taken from top 20 results)
    const handleRight = () => fetchHint('right', 20)

    // Handle pressing 'Syllables' button
    const handleSyllables = () => {
        const updatedDisabled = { ...disabled, syllables: true }
        setHint({
            disabled: updatedDisabled,
            msg: `number of syllables is ${numSyllables}`
        })
    }


    const updateStateOnEvent = (letter) => {
        if (!lostGame && !isWinner) {
            setGuessedLtr(prevSt => new Set(prevSt.add(letter)))
            setNWrong(nWrong + (answer.includes(letter) ? 0 : 1))
        }
    }

    // Handle mouse events
    const handleGuessClick = (evt) => {
        let letter = evt.target.value;
        updateStateOnEvent(letter)
    }

    // Handle key events 
    // - letters update game state
    // - LEFT & RIGHT arrows fetch the hints
    const handleGuessKey = (evt) => {
        if (evt.key === 'ArrowLeft') !disabled.left && handleLeft()
        else if (evt.key === 'ArrowRight') !disabled.right && handleRight()
        else {
            let letter = evt.key;
            if (!guessedLtr.has(letter)) updateStateOnEvent(letter)
            setTimeout(() => evt.target.value = "", 150)
        }
    }


    // Reset values at restart (next game)
    const handleRestart = () => {
        getData()
        setNWrong(0)
        setGuessedLtr(new Set())
        setIsWinner(false)
        setLostGame(false)
        setBackground(genBackground(8, 20, 35))
        setHint({
            msg: 'there is no message for you.',
            disabled: { left: false, syllables: false, right: false }
        })
    }

    // Render message at the end of the game (depending if player lost or won)
    const endResult = () => {
        if (isWinner) {
            return (
                <span className='win-msg'> You win !! </span>
            )
        } else {
            return (
                <div className='lose-msg'>
                    <span> You lose !! </span>
                    <p className='correct-answer'>The correct answer is:
                        <span> {answer.toUpperCase()}</span>
                    </p>
                </div>
            )
        }
    }

    // Render definitions at the end of the game (if available)
    const definitions = () => {
        if (def && def.length > 1 && (isWinner || lostGame)) {
            const allDefinitions = def.map((el, i) => <p key={i}>{i + 1}.  {el}</p>)

            return (
                <section className={classes.definitionsAtEndGame}>
                    <hr />
                    <p>More definitions of {answer}:</p>
                    <div>{allDefinitions}</div>
                </section>
            )
        }
    }

    // Capitalize constraints (relate, topics) -> (Relate, Topics)
    let capitalizedConstraint = constraint.charAt(0).toUpperCase() + constraint.slice(1);

    return (
        <div className={classes.root} >
            <MainDrawer>
                {/* Height from useHeightAnimHook. Background from genBackground() */}
                <div className={classes.mainContainer} style={{ background, height }} >
                    <header className={classes.headerContainer}>
                        <h1 className='title'>Guess The Word</h1>
                        <p>Guessed <span>wrong</span>:
                            <span>{`${nWrong} / ${maxWrong}`}</span>
                        </p>
                    </header>
                    {/* ref from useHeightAnimHook (used to determine height of the content ) */}
                    <div ref={ref} className={classes.main}>

                        <section>
                            <p className='category'>
                                {constraint === 'ml' ?
                                    <strong>Relate</strong> : <strong>{capitalizedConstraint}</strong>}: {category.toUpperCase()} ({tags})
                            </p>

                            {/* {Restrain for too long defitions} */}
                            {def[0].length < 2000 ? def[0] : def[0].substring(0, 2000) + '...'}
                        </section>

                        <section className='centeredSection'>
                            <Buttons guessed={guessedLtr} handleGuess={handleGuessClick} answer={answer} isWinner={isWinner} />
                            <p className='guessedWord'>{guessedWord}</p>
                            <TextField id="filled-basic" label="Type a letter" variant="filled"
                                classes={{ root: classes.textField }}
                                onKeyDown={handleGuessKey} autoComplete='off'
                                placeholder={!guessedLtr.size ? '' : [...guessedLtr].pop()}
                            />
                        </section>

                        <section>
                            <div className={classes.message}><strong>Message:</strong>
                                {(lostGame || isWinner) ?
                                    endResult() : <span> {msg} </span>
                                }
                            </div>
                        </section>

                        <section
                            className={classes.buttonsContainer}>
                            <CustomTooltip title='Common words that appear immediately to the left of the target word' isDisabled={isWinner || lostGame || disabled.left}>
                                <span><button onClick={handleLeft} disabled={isWinner || lostGame || disabled.left}>&#8636; Left</button></span>
                            </CustomTooltip>
                            <CustomTooltip title='Show number of syllables' isDisabled={isWinner || lostGame || disabled.syllables}>
                                <span><button onClick={handleSyllables} disabled={isWinner || lostGame || disabled.syllables}>Syllables</button></span>
                            </CustomTooltip>
                            <CustomTooltip title='Common words that appear immediately to the right of the target word' isDisabled={isWinner || lostGame || disabled.right}>
                                <span><button onClick={handleRight} disabled={isWinner || lostGame || disabled.right}>Right &#8640;</button></span>
                            </CustomTooltip>
                            <button className='btn-next' onClick={handleRestart}>
                                Next</button>
                        </section>
                        {definitions()}
                    </div>
                </div>
            </MainDrawer>
        </div>
    )
}

export default withStyles(styles)(GameScreen);
