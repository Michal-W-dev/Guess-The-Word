import { useState, useEffect, useContext, FC, ChangeEvent, MouseEvent, FormEvent } from 'react'
import { OptionsContext } from '../context/options.context';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import TabPanel from './TabPanel';
import { StyledRootDiv, StyledDialog } from '../styles/FormStyles';


const marks = [
    { value: 1, label: '1°' },
    { value: 2, label: '2°' },
    { value: 3, label: '3°' },
    { value: 4, label: '4°' },
    { value: 5, label: '5°' },
    { value: 6, label: '6°' },
    { value: 7, label: '7°' },
];

interface Props {
    showForm: { show: boolean, tabIndex: number },
    closeForm: (data: { tabIndex: number }) => void,
};


const Form: FC<Props> = ({ showForm, closeForm }) => {
    const { show, tabIndex } = showForm;
    const { maxWrong, changeMaxWrong, name, changeName } = useContext(OptionsContext)

    //Tabs
    const [value, setValue] = useState(0);
    //Forms
    const [inputText, setInputText] = useState(name)
    const [sliderValue, setSliderValue] = useState(maxWrong)


    const handleTabChange = (evt: ChangeEvent<{}>, newValue: number) => setValue(newValue)

    useEffect(() => { setValue(tabIndex) }, [tabIndex])

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        closeForm({ tabIndex: value })
        changeName(inputText)
        changeMaxWrong(sliderValue)
    }

    const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => setInputText(evt.target.value)

    const handleSliderChange = (evt: Event, value: number | number[]) => {
        if (typeof value === 'number') setSliderValue(value)
    }

    const stopPropagation = (evt: MouseEvent<HTMLDivElement | HTMLFormElement>) => evt.stopPropagation();

    return (
        <div className='Form' onClick={() => closeForm({ tabIndex: value })}>
            <StyledDialog open={show} className='dialog'>
                <StyledRootDiv>
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
                            className='form slideLeft'
                            noValidate
                            autoComplete="off"
                            onClick={stopPropagation}
                            onSubmit={handleSubmit}
                        >
                            <h1 className='formTitle'>Enter your name</h1>
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
                        <footer className='bottomBorder' />
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <form
                            className='form slideRight'
                            noValidate
                            autoComplete="off"
                            onClick={stopPropagation}
                            onSubmit={handleSubmit}
                        >
                            <h1 className='formTitle'>Number of attemps</h1>
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
                        <footer className='bottomBorder' />
                    </TabPanel>
                </StyledRootDiv>
            </StyledDialog>
        </div>
    )
}
export default Form;