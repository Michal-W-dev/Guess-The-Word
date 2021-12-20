import { FC, createContext, useEffect } from 'react';
import useOptionsState from '../hooks/useOptionsState'

interface InitData {
    name: string,
    maxWrong: number,
    changeName: (editedName: string) => void,
    changeMaxWrong: (editedMaxWrong: number) => void
}

// Unparse Data from Local Storage
const storageData = localStorage.getItem('storageData')
// Parse data or set default one
const initData: InitData = storageData ? JSON.parse(storageData) : { name: '1', maxWrong: 4 }

export const OptionsContext = createContext(initData);

export const OptionsProvider: FC = ({ children }) => {
    // useOptionsState = { name, maxWrong, editName, editMaxWrong }
    const options = useOptionsState(initData)
    const { name, maxWrong } = options;

    useEffect(() => {
        window.localStorage.setItem('storageData', JSON.stringify({ name, maxWrong }))
    }, [name, maxWrong])

    return (
        <OptionsContext.Provider value={options}>
            {children}
        </OptionsContext.Provider>
    )
}