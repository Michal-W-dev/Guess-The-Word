import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Buttons from '../components/Buttons'
import MainDrawer from '../components/MainDrawer'
import { arrCategory, arrConstraint, random, genBackground } from "../utils"
import TextField from '@material-ui/core/TextField';
import CustomTooltip from '../components/Tooltip'
import useHeightAnimHook from '../hooks/useHeightAnimHook';
import styles from '../styles/GameScreenStyles'


const GameScreen = ({ classes }) => {
    const [nWrong, setNWrong] = useState(0)
    const [guessedLtr, setGuessedLtr] = useState(new Set())
    const [isWinner, setIsWinner] = useState(false)
    const [lostGame, setLostGame] = useState(false)

    const [hint, setHint] = useState({
        msg: " Click 'Left', 'Right' or 'Hint' button to display more messages. Hover over each button to get more description.",
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


    // Set local storage
    const initData = JSON.parse(window.localStorage.getItem('storageData')) || { name: 1, maxWrong: 4 }
    // Set (name & difficulty level). State maxWrong is passing to (MainDrawer Component) & then to (Form) Component
    const [maxWrong, setMaxWrong] = useState(initData.maxWrong);
    const [name, setName] = useState(initData.name);
    const changeMaxWrong = (level) => setMaxWrong(level)
    const changeName = (name) => setName(name)

    useEffect(() => {
        window.localStorage.setItem('storageData', JSON.stringify({ name, maxWrong }))
    }, [name, maxWrong])


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


    const guessedWord = () => (
        answer.split('').map(letter => guessedLtr.has(letter) ? letter : '_')
    )

    useEffect(() => {
        if (answer) {
            if (guessedWord().join('') === answer) setIsWinner(true)
            else if (nWrong >= maxWrong) setLostGame(true)
        } else getData()
        // eslint-disable-next-line
    }, [answer, guessedLtr, nWrong, maxWrong])


    const updateStateOnEvent = (letter) => {
        if (!lostGame && !isWinner) {
            setGuessedLtr(prevSt => new Set(prevSt.add(letter)))
            setNWrong(nWrong + (answer.includes(letter) ? 0 : 1))
        }
    }

    const handleGuessClick = (evt) => {
        let letter = evt.target.value;
        updateStateOnEvent(letter)
    }
    const handleGuessKey = (evt) => {
        if (evt.key === 'ArrowLeft') !disabled.left && handleLeft()
        else if (evt.key === 'ArrowRight') !disabled.right && handleRight()
        else {
            let letter = evt.key;
            if (!guessedLtr.has(letter)) updateStateOnEvent(letter)
            // evt.target.placeholder = letter;
            setTimeout(() => evt.target.value = "", 150)
        }
    }

    const handleSyllables = () => {
        const updatedDisabled = { ...disabled, syllables: true }
        setHint({
            disabled: updatedDisabled,
            msg: `number of syllables is ${numSyllables}`
        })
    }


    const fetchHint = (direction, max) => {
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

    const handleLeft = () => {
        fetchHint('left', 20)
    }

    const handleRight = () => {
        fetchHint('right', 20)
    }

    // Reset values at restart
    const handleRestart = () => {
        getData()
        setNWrong(0)
        setGuessedLtr(new Set())
        setIsWinner(false)
        setLostGame(false)
        setHint({
            msg: 'there is no message for you.',
            disabled: { left: false, syllables: false, right: false }
        })
    }

    const endResult = () => {
        // let moreDef;
        // if (def) {
        //     moreDef = (def.length > 1) ? (
        //         def.filter((el, i) => i > 0).map((el, i) => <p key={i}>{i + 2}.  {el}</p>)
        //     ) : <p style={{ textAlign: 'center' }}>Only one definition available</p>;
        // }
        if (isWinner) {
            return (

                // <div className="EndResult">
                //     <p style={{ fontSize: '40px', fontWeight: '900' }}>You win !! </p>
                // </div>
                <span style={{ fontSize: '3.1rem', fontWeight: '600', marginLeft: '0.6rem' }}> You win !! </span>
            )
        } else {
            return (
                <>
                    {/* // <div className="EndResult"> */}
                    <span style={{ fontSize: '3rem', marginLeft: '0.5rem' }}> You lose !! </span>
                    <p style={{ fontSize: '2rem', marginLeft: '10rem' }}>The correct answer is:
                        <span style={{ fontWeight: '600', letterSpacing: '3px' }}> {answer.toUpperCase()}</span>
                    </p>
                    {/* <p style={{ fontSize: '3rem' }}>You lose !! </p>
                    <p style={{ fontSize: '2rem' }}>The correct answer is:
                        <span style={{ fontWeight: '600', letterSpacing: '3px' }}> {answer.toUpperCase()}</span>
                    </p> */}
                    {/* <p>Def.</p>
                    <p className="EndResult-def">1. {(def) ? def[0] : 'definition not available'} </p>
                    {(def) ? (<div className='more-def'>{moreDef}</div>) : null} */}
                    {/* // </div> */}
                </>
            )
        }
    }
    const definitions = () => {
        let moreDef;
        if (def) {
            // moreDef = (def.length > 1) ? (
            //     def.filter((el, i) => i > 0).map((el, i) => <p key={i}>{i + 2}.  {el}</p>)
            // ) : <p style={{ textAlign: 'center' }}>Only one definition available</p>;
            if (def.length > 1) {
                moreDef = def.filter((el, i) => i > 0).map((el, i) => <p key={i}>{i + 2}.  {el}</p>)
            }
        }
        // if (isWinner || lostGame) {
        if (moreDef && (isWinner || lostGame)) {
            // if (moreDef) {
            return (
                <div style={{ marginTop: '3rem' }}>
                    <hr />
                    <p style={{ fontWeight: 400 }}>More definitions of {answer}:</p>
                    {/* <p className="EndResult-def">1. {(def) ? def[0] : 'definition not available'} </p> */}
                    <p className="EndResult-def">1. {def[0]} </p>
                    {(def) ? (<div className='more-def'>{moreDef}</div>) : null}
                </div>
            )
        }

    }


    let capConstraint = constraint.charAt(0).toUpperCase() + constraint.slice(1);

    // Generate (buttons)
    let generateBtns = (
        // <div style={{ marginTop: '2rem' }}>
        <Buttons guessed={guessedLtr} handleGuess={handleGuessClick} answer={answer} isWinner={isWinner} />
        // </div>
    )
    let generateInput = (
        <TextField id="filled-basic" label="Type a letter" variant="filled"
            classes={{ root: classes.textField }}
            onKeyDown={handleGuessKey} autoComplete='off'
            placeholder={!guessedLtr.size ? '' : [...guessedLtr].pop()}
        />
        // {/* <TextField id="standard-basic" label="Type a letter" classes={{ root: classes.textField }} onKeyDown={handleGuessKey} autoComplete='off' /> */}
    )

    return (
        <div className={classes.root} >
            <MainDrawer maxWrong={maxWrong} changeMaxWrong={changeMaxWrong} name={name} changeName={changeName}>
                {/* Height from useHeightAnimHook. Function genBg(numOfStripes, minSaturation, maxSaturation) */}
                <div className={classes.container} style={{ background: genBackground(8, 20, 35), height }} >
                    <header className={classes.headerContainer}>
                        <h1 className='title'>Guess The Word</h1>
                        <p>Guessed wrong:
                            <span>{`${nWrong} / ${maxWrong}`}</span>
                        </p>
                    </header>
                    {/* ref from useHeightAnimHook (used to determine height content ) */}
                    <div ref={ref} className={classes.main}>
                        <div>
                            {/* <img className='left' src={images[nWrong]} alt={altText} /> */}
                            {/* <div className={`right ${(lostGame || isWinner) ? 'transWidthShort' : 'transWidthLong'}`}> */}
                            <p className='category'>{constraint === 'ml' ? <strong>Relate</strong> : <strong>{capConstraint}</strong>}: {category.toUpperCase()} ({tags})</p>

                            {/* {String(def).substring(0, 1200)} */}
                            {def[0].length < 2000 ? def[0] : def[0].substring(0, 2000) + '...'}

                            {/* {console.log(fetchedData)} */}
                            {/* {(lostGame || isWinner) ? endResult() : genBtnsInput} */}
                            {generateBtns}
                            <div className='input' style={{
                                textAlign: 'center',
                                margin: '2rem 0',
                                maxWidth: '75rem',
                            }}>
                                <p className='word'
                                    style={{ letterSpacing: '2rem', textTransform: 'uppercase', marginBottom: '2rem', fontFamily: 'Montserrat', fontWeight: '300' }}
                                // style={{ letterSpacing: '2rem', textTransform: 'uppercase', marginBottom: '2rem' }}
                                >{guessedWord()}</p>
                                {generateInput}
                            </div>
                            <div className="hint-msg">

                                {/* {(msg.includes(' message ')) && <p className='description'>Click 'Left', 'Right' or 'Hint' button to display more messages. Hover over each message to get more description.</p>} */}
                                <div className="msg" style={{ padding: '10px' }}><strong>Message:</strong>
                                    {(lostGame || isWinner) ? endResult() :
                                        <span style={{ fontStyle: 'italic' }} > {msg}</span>
                                    }
                                </div>
                            </div>
                            <div
                                className={classes.buttonsContainer}
                                style={{ maxWidth: '75rem', textAlign: 'center' }}
                            >
                                <CustomTooltip title='Common words that appear immediately to the left of the target word' isDisabled={isWinner || lostGame || disabled.left}>
                                    <span><button onClick={handleLeft} disabled={isWinner || lostGame || disabled.left}>Left</button></span>
                                </CustomTooltip>
                                <CustomTooltip title='Show number of syllables' isDisabled={isWinner || lostGame || disabled.syllables}>
                                    <span><button onClick={handleSyllables} disabled={isWinner || lostGame || disabled.syllables}>Syllables</button></span>
                                </CustomTooltip>
                                <CustomTooltip title='Common words that appear immediately to the right of the target word' isDisabled={isWinner || lostGame || disabled.right}>
                                    <span><button onClick={handleRight} disabled={isWinner || lostGame || disabled.right}>Right</button></span>
                                </CustomTooltip>
                                <button className='btn next' onClick={handleRestart}
                                    style={{ margin: '1rem 4rem' }}
                                >
                                    Next</button>
                            </div>
                            {definitions()}
                        </div>
                    </div>
                </div>
            </MainDrawer>
        </div>
    )
}

export default withStyles(styles)(GameScreen);
