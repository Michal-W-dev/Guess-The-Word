import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Buttons from '../components/Buttons'
import MainDrawer from '../components/MainDrawer'
import { arrCategory, arrConstraint, random, genBackground } from "../utils"
import TextField from '@material-ui/core/TextField';
import sizes from '../styles/sizes'
import CustomTooltip from '../components/Tooltip'
import useHeightAnimHook from '../hooks/useHeightAnimHook';

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
        // backgroundColor: 'rgb(50, 50, 50)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        // backgroundColor: 'rgba(255,255,255, 0.2)',
        // textShadow: '0 0 1px aqua, 0 0 2px aqua, 0 0 3px aqua',
        // display: 'block',
        width: '100%',
        height: '7rem',
        // lineHeight: '7rem',
        // textAlign: 'center',
        padding: '0 4rem',
        // borderBottom: '1px solid rgba(255,255,255,.7)',
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
            // boxShadow: 'inset 1px 1px 5px black, inset 0 0 1px 2px white, inset 0 -2px 0px 1px white',
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
            // padding: '5rem 0 0 0',
            fontSize: '2rem',
            paddingLeft: '2rem',
            width: '12rem',
            boxShadow: 'inset 3px 3px 3px black, 1px 1px 2px 1px black',
            textTransform: 'uppercase',
            border: '1px solid hsl(210, 100%, 90%)',
        },
        '& label': {
            // paddingLeft: '1.5rem',
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
            transition: '1s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                transform: 'skew(-40deg) rotateY(40deg) rotateX(30deg)',
                // transform: 'skew(-40deg) rotateY(35deg) rotateX(25deg)',
                boxShadow: '2px 2px 1px 0px aqua, 0 1px 2px white, inset -1px -1px 3px aqua',
                color: 'rgb(190, 255, 255)',
                textShadow: '2px 2px #1f36b4, 2px 2px 2px aqua, 2px 2px 12px aqua',
                // transform: 'skew(-30deg) rotateY(40deg)',
                // transform: 'skew(20deg) rotateY(40deg) '
                // transform: 'skew(-10deg) rotate(-3deg) rotateY(5deg)',
            },
        },
    },
}




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

    // Set difficulty level. State maxWrong is passing to (MainDrawer Component) & then to (Form) Component
    const [maxWrong, setMaxWrong] = useState(2);
    const changeMaxWrong = (level) => setMaxWrong(level)


    const getData = () => {
        let constraint = random(arrConstraint);
        let category = random(arrCategory);
        return fetch(`https://api.datamuse.com/words?${constraint}=${category}&max=30&md=dps`)
            .then(res => res.json())
            .then(data => {
                let rand;
                do {
                    rand = random(data)
                    // console.log('rand ', rand.word.length, rand.defs.join(''));
                } while (rand.word.length < 5 || rand.word.length > 16)

                let tags = rand.tags.join(', ');
                let def = rand.defs || ['no definition available, try to guess it anyway! :)'];
                // console.log('constraint', constraint, 'category', category, 'data', data, 'tags', tags, 'def', def);
                console.log('tags', tags, 'def', def);

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
        let letter = evt.key;
        if (!guessedLtr.has(letter)) updateStateOnEvent(letter)
        evt.target.placeholder = letter;
        setTimeout(() => evt.target.value = "", 150)
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
                    if (randWord.length > 3) {
                        nums.add(randWord)
                    }
                    count++;
                    // nums.add(random(data).word)
                    // console.log(nums, count);
                } while (nums.size < 3 && count < max)
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
        // setShrink(false)
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

    // render: render game //
    // const maxWrong = 3;
    // let lostGame = (nWrong >= maxWrong) 
    // if (nWrong >= maxWrong) setLostGame(true)
    // console.log(nWrong, '>', maxWrong)
    // 
    // let altText = `${nWrong} / ${maxWrong} guesses`
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
        />
        // {/* <TextField id="standard-basic" label="Type a letter" classes={{ root: classes.textField }} onKeyDown={handleGuessKey} autoComplete='off' /> */}
    )


    return (
        <div className={classes.root} >
            <MainDrawer maxWrong={maxWrong} changeMaxWrong={changeMaxWrong}>
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
                            {/* {console.log('rendered __________1')} */}
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
                                <CustomTooltip title='Common words that appear immediately to the left of the target word' isDisabled={disabled.left}                                >
                                    <span><button onClick={handleLeft} disabled={disabled.left}>Left</button></span>
                                </CustomTooltip>
                                <CustomTooltip title='Show number of syllables' isDisabled={disabled.syllables}                                >
                                    <span><button onClick={handleSyllables} disabled={disabled.syllables}>Syllables</button></span>
                                </CustomTooltip>
                                <CustomTooltip title='Common words that appear immediately to the right of the target word' isDisabled={disabled.right} >
                                    <span><button onClick={handleRight} disabled={disabled.right}>Right</button></span>
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
