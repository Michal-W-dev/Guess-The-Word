import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Buttons from '../components/Buttons'
import MainDrawer from '../components/MainDrawer'
import { arrCategory, arrConstraint, random } from "../utils"


const GameScreen = () => {
    const [nWrong, setNWrong] = useState(0)
    const [guessed, setGuessed] = useState(new Set())
    const [isWinner, setIsWinner] = useState(false)
    // const [disabled, setDisabled] = useState({ left: false, syllables: false, right: false })
    // const [msg, setMsg] = useState('there is no message for you.')

    const [hint, setHint] = useState({
        msg: 'there is no message for you.',
        disabled: { left: false, syllables: false, right: false }
    })

    const [fetchedData, setFetchedData] = useState({
        answer: 'null',
        constraint: 'null',
        category: 'null',
        tags: 'part-of-speech',
        def: 'definition',
        numSyllables: 0
    })
    const { answer, constraint, category, tags, def, numSyllables } = fetchedData;
    const { msg, disabled } = hint;


    const getData = () => {
        let constraint = random(arrConstraint);
        let category = random(arrCategory)
        return fetch(`https://api.datamuse.com/words?${constraint}=${category}&max=30&md=dps`)
            .then(res => res.json())
            .then(data => {
                let rand;
                do {
                    rand = random(data)
                    // console.log('rand ', rand.word.length, rand.defs.join(''));
                } while (rand.word.length < 5 || rand.word.length > 16)

                let tags = rand.tags.join(', ');
                let def = rand.defs;
                // console.log(constraint, category, data);

                setFetchedData({
                    answer: rand.word,
                    numSyllables: rand.numSyllables,
                    constraint, category, tags, def,
                })
            }).catch((err) => console.log('ERROR!', err))
    }

    useEffect(() => getData(), [])

    useEffect(() => {
        if (guessedWord().join('') === answer) setIsWinner(true)
    }, [guessed, answer])


    const guessedWord = () => (
        answer.split("").map(letter => (guessed.has(letter) ? letter : "_"))
    )

    const updateStateOnEvent = (letter) => {
        setGuessed(prevSt => new Set(prevSt.add(letter)))
        setNWrong(nWrong + (answer.includes(letter) ? 0 : 1))
        // setIsWinner(guessedWord().join('') === answer)
    }

    const handleGuessClick = (evt) => {
        let letter = evt.target.value;
        updateStateOnEvent(letter)
    }
    const handleGuessKey = (evt) => {
        let letter = evt.key;
        if (!guessed.has(letter)) {
            updateStateOnEvent(letter)
        }
        evt.target.placeholder = letter;
        setTimeout(() => (evt.target.value = ''), 150)
        // console.log('value: ', evt.target, 'ltr: ', ltr, 'gussed: ');
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
        setGuessed(new Set())
        setIsWinner(false)
        setHint({
            msg: 'there is no message for you.',
            disabled: { left: false, syllables: false, right: false }
        })
    }

    const endResult = () => {
        let moreDef;
        if (def) {
            moreDef = (def.length > 1) ? (
                def.filter((el, i) => i > 0).map((el, i) => <p key={i}>{i + 2}.  {el}</p>)
            ) : <p style={{ textAlign: 'center' }}>Only one definition available</p>;
        }
        if (isWinner) {
            return (
                <div className="EndResult">
                    <p style={{ fontSize: '40px', fontWeight: '900' }}>You win !! </p>
                </div>)
        } else {
            return (
                <div className="EndResult">
                    <p style={{ fontSize: '30px' }}>You lose !! </p>
                    <p style={{ fontSize: '20px' }}>The correct answer is:</p>
                    <p style={{ fontWeight: '900', letterSpacing: '3px' }}>{answer.toUpperCase()}</p>
                    <p className="EndResult-def">Def. {(def) ? def[0] : 'definition not available'} </p>
                    {(def) ? (<div className='more-def'>{moreDef}</div>) : null}
                </div>)
        }
    }

    // render: render game //
    const maxWrong = 3;
    let lostGame = nWrong >= maxWrong
    // let altText = `${nWrong} / ${maxWrong} guesses`
    let capConstraint = constraint.charAt(0).toUpperCase() + constraint.slice(1);

    // Generate (buttons & input)
    let genBtnsInput = (
        <div>
            <Buttons guessed={guessed} handleGuess={handleGuessClick} answer={answer} isWinner={isWinner} />
            <div className='input'>
                <label htmlFor="input">Type a letter</label>
                <input id="input" onKeyDown={handleGuessKey} />
            </div>
        </div>
    )


    return (

        <div style={{ fontSize: '20px' }}>
            <MainDrawer>
                <h1>Guess The Word</h1>
                <div className='flex'>
                    {/* <img className='left' src={images[nWrong]} alt={altText} /> */}
                    {/* <div className={`right ${(lostGame || isWinner) ? 'transWidthShort' : 'transWidthLong'}`}> */}
                    <p className='category'>{constraint === 'ml' ? 'Relate' : capConstraint}: {category.toUpperCase()} ({tags})</p>
                    <p className='numWrong'>Guessed wrong: {nWrong}</p>
                    <p className='word'>{guessedWord()}</p>

                    {/* {(lostGame || isWinner) ? endResult() : genBtnsInput} */}
                    {genBtnsInput}
                    {console.log('rendered !!')}
                    <div className="hint-msg">
                        {(msg.includes('LEFT')) && <p className='description'>Words that appear immediately to the LEFT of the target word in a sentence.</p>}
                        {(msg.includes('RIGHT')) && <p className='description'>Words that appear immediately to the RIGHT of the target word in a sentence.</p>}
                        {(msg.includes(' syllables ')) && <p className='description'>Only number of syllables available, in the future there might be more variety of hints.</p>}
                        {(msg.includes(' message ')) && <p className='description'>Click 'Left', 'Right' or 'Hint' button to display more messages. Hover over each message to get more description.</p>}
                        <p className="msg" style={{ padding: '10px' }}><b>Message: </b>{msg}</p>
                    </div>
                    <button className='btn Hint' onClick={handleLeft} disabled={disabled.left}>Left</button>
                    <button className='btn Hint' onClick={handleSyllables} disabled={disabled.syllables}>Syllables</button>
                    <button className='btn Hint' onClick={handleRight} disabled={disabled.right}>Right</button>
                    <button className='btn restart' onClick={handleRestart}>Next</button>
                    {/* </div> */}
                </div>
            </MainDrawer>
        </div>



    )
}

export default GameScreen
