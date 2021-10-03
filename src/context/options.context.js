import React, { createContext, useEffect } from 'react';
import useOptionsState from '../hooks/useOptionsState'

// Set local storage
const initData = JSON.parse(window.localStorage.getItem('storageData')) || { name: 1, maxWrong: 4, theme: 'dark' }

export const OptionsContext = createContext();

export function OptionsProvider(props) {
    // useOptionsState = { name, maxWrong, editName, editMaxWrong }
    const options = useOptionsState(initData)
    const { name, maxWrong } = options;

    useEffect(() => {
        window.localStorage.setItem('storageData', JSON.stringify({ name, maxWrong }))
    }, [name, maxWrong])

    return (
        <OptionsContext.Provider value={options}>
            {props.children}
        </OptionsContext.Provider>
    )
}