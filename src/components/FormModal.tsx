import { useState, useEffect, useContext, FC, ChangeEvent, MouseEvent, FormEvent, useRef } from 'react'
import { OptionsContext } from '../context/options.context';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import TabPanel from './TabPanel';
import { StyledRootDiv, StyledDialog } from '../styles/FormModalStyles';
import Form from './Form'

// Marks used in Sliders
const markDifficults = [
    { value: 1, label: '1°' },
    { value: 2, label: '2°' },
    { value: 3, label: '3°' },
    { value: 4, label: '4°' },
    { value: 5, label: '5°' },
    { value: 6, label: '6°' },
    { value: 7, label: '7°' },
];
const markColors = [
    { value: 3, label: <span className='markColors red'>Red</span> },
    { value: 112, label: <span className='markColors green'>Green</span> },
    { value: 231, label: <span className='markColors blue'>Blue</span> },
    { value: 280, label: <span className='markColors violet'>Violet</span> },
    { value: 330, label: <span className='markColors pink'>Pink</span> },
];

interface Props {
    showForm: { show: boolean, tabIndex: number },
    closeForm: (data: { tabIndex: number, resetColor: number }) => void,
};


const FormModal: FC<Props> = ({ showForm, closeForm }) => {
    const { show, tabIndex } = showForm;
    const { maxWrong, changeMaxWrong, name, changeName, changeColor, colorNumber } = useContext(OptionsContext)
    const [formColor, setFormColor] = useState(colorNumber)

    //Tabs
    const [value, setValue] = useState(0);
    //Forms
    const [sliderValue, setSliderValue] = useState(maxWrong)
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleTabChange = (evt: ChangeEvent<{}>, newValue: number) => setValue(newValue)

    useEffect(() => { setValue(tabIndex) }, [tabIndex])
    useEffect(() => {
        // Update colors
        document.body.style.setProperty('--num', formColor.toString());
    }, [colorNumber, formColor])

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        closeForm({ tabIndex: value, resetColor: colorNumber })
        changeMaxWrong(sliderValue)
        const name = nameInputRef.current?.value
        if (name) changeName(name)
        changeColor(formColor)
    }

    const handleSliderChange = (evt: Event, value: number | number[]) => {
        if (typeof value === 'number') setSliderValue(value)
    }

    const handleColorChange = (evt: Event, value: number | number[]) => {
        if (typeof value === 'number') setFormColor(value)
    }
    const stopPropagation = (evt: MouseEvent<HTMLDivElement>) => evt.stopPropagation();


    return (
        <div className='Form' onClick={() => closeForm({ tabIndex: value, resetColor: colorNumber })}>
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
                            <Tab className='tab' label="Choose Color" />
                            <Tab className='tab' label=" " disabled />
                        </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0} >
                        <Form
                            className='form slideLeft'
                            title='Enter your name'
                            onSubmit={handleSubmit}
                            onClick={() => closeForm({ tabIndex: value, resetColor: colorNumber })}
                        >
                            <TextField
                                label="Player name"
                                autoFocus
                                inputRef={nameInputRef}
                                // inputRef={input => input && input.focus()}
                                placeholder={name.trim() ? name : 'Enter you name'}
                            />
                        </Form>
                        <footer className='bottomBorder' />
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <Form
                            className='form slideLeft'
                            title='Number of attemps'
                            onSubmit={handleSubmit}
                            onClick={() => closeForm({ tabIndex: value, resetColor: colorNumber })}
                        >
                            <Slider
                                value={sliderValue}
                                aria-labelledby="discrete-slider-custom"
                                step={1}
                                min={1}
                                max={7}
                                valueLabelDisplay="auto"
                                onChange={handleSliderChange}
                                marks={markDifficults}
                            />
                        </Form>
                        <footer className='bottomBorder' />
                    </TabPanel>
                    <TabPanel value={value} index={2} >
                        <Form
                            className='form slideLeft'
                            title='Change colors'
                            onSubmit={handleSubmit}
                            onClick={() => closeForm({ tabIndex: value, resetColor: colorNumber })}
                        >
                            <Slider
                                value={formColor}
                                aria-labelledby="discrete-slider-custom"
                                min={1}
                                max={340}
                                // valueLabelDisplay="auto"
                                onChange={handleColorChange}
                                marks={markColors}
                            />
                        </Form>
                        <footer className='bottomBorder' />
                    </TabPanel>
                </StyledRootDiv>
            </StyledDialog>
        </div>
    )
}
export default FormModal;