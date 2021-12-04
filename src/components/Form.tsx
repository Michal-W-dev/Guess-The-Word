import React, { useState, useEffect, useContext, FC, ChangeEvent, MouseEvent, FormEvent } from 'react'
import { OptionsContext } from '../context/options.context';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import TabPanel from './TabPanel';
import { withStyles, WithStyles } from "@material-ui/core/styles";
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

interface Props extends WithStyles<typeof styles> {
    showForm: { show: boolean, tabIndex: number },
    closeForm: (data: { tabIndex: number }) => void,
};

const Form: FC<Props> = ({ classes, showForm, closeForm }) => {
    const { show, tabIndex } = showForm;
    const { maxWrong, changeMaxWrong, name, changeName } = useContext(OptionsContext)

    //Tabs
    const [value, setValue] = useState(0);
    //Forms
    const [inputText, setInputText] = useState(name)
    const [sliderValue, setSliderValue] = useState(maxWrong)

    // console.log('tabIndex ', typeof tabIndex);

    const handleTabChange = (evt: ChangeEvent<{}>, newValue: number) => setValue(newValue)

    useEffect(() => { setValue(tabIndex) }, [tabIndex])

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        closeForm({ tabIndex: value })
        changeName(inputText)
        changeMaxWrong(sliderValue)
    }

    const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => setInputText(evt.target.value)

    const handleSliderChange = (evt: ChangeEvent<{}>, newValue: number | number[]) => setSliderValue(newValue)

    const stopPropagation = (evt: MouseEvent<HTMLDivElement | HTMLFormElement>) => evt.stopPropagation();

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
                        <Tab className='tab' label="Set Name" />
                        <Tab className='tab' label="Set Difficulty" />
                        <Tab className='tab' label=" " disabled />
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
                        <div className='btns-container'>
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
                        <div className='btns-container'>
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