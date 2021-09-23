import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import TabPanel from './TabPanel';
import { withStyles } from "@material-ui/core/styles";
import styles from '../styles/FormStyles'

const marks = [
    { value: 1, label: '1°' },
    { value: 2, label: '2°' },
    { value: 3, label: '3°' },
    { value: 4, label: '4°' },
    { value: 5, label: '5°' },
    { value: 6, label: '6°' },
    { value: 7, label: '7°' },
];

const Form = (props) => {
    const { classes, showForm, changeName, changeDifficulty, closeForm, maxWrong, name } = props;
    const { show, tabIndex } = showForm;
    //Tabs
    const [value, setValue] = useState();
    //Forms
    const [inputText, setInputText] = useState(name)
    const [sliderValue, setSliderValue] = useState(maxWrong)

    const handleTabChange = (evt, newValue) => setValue(newValue)

    useEffect(() => { setValue(tabIndex) }, [tabIndex])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        closeForm({ tabIndex: value })
        changeName(inputText)
        changeDifficulty(sliderValue)
    }

    const handleTextChange = (evt) => setInputText(evt.target.value)
    const handleSliderChange = (evt, newValue) => setSliderValue(newValue)

    const stopPropagation = (evt) => evt.stopPropagation();

    return (
        <div onClick={() => closeForm({ tabIndex: value })} >
            <Dialog open={show} className={classes.dialog}>
                <Paper square onClick={stopPropagation}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                        aria-label="options tabs"
                    >
                        <Tab label="Set Name" style={{ fontSize: '1.4rem' }} />
                        <Tab label="Set Difficulty" style={{ fontSize: '1.4rem' }} />
                        <Tab label=" " disabled style={{ fontSize: '1.4rem' }} />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0} >
                    <form
                        className={clsx(classes.form, 'slideLeft')}
                        noValidate
                        autoComplete="off"
                        onClick={stopPropagation}
                        onSubmit={handleSubmit}
                    >
                        <h1 className={classes.formTitle}>Enter your name</h1>
                        <TextField
                            onChange={handleTextChange}
                            label="Player name"
                            inputRef={input => input && input.focus()}
                            value={inputText}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                color='primary'
                                onClick={() => closeForm({ tabIndex: value })}
                            > Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant="contained"
                                color='primary'>
                                Save Name
                            </Button>
                        </div>
                    </form>
                    <footer className={classes.bottomBorder} />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <form
                        className={clsx(classes.form, 'slideRight')}
                        noValidate
                        autoComplete="off"
                        onClick={stopPropagation}
                        onSubmit={handleSubmit}
                    >
                        <h1 className={classes.formTitle}>Number of attemps</h1>
                        <Slider
                            defaultValue={3}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            min={1}
                            max={7}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange}
                            value={sliderValue}
                            marks={marks}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                color='primary'
                                onClick={() => closeForm({ tabIndex: value })}
                            > Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant="contained"
                                color='primary'>
                                Save Name
                            </Button>
                        </div>
                    </form>
                    <footer className={classes.bottomBorder} />
                </TabPanel>
            </Dialog>
        </div >
    )
}
export default withStyles(styles)(Form);





