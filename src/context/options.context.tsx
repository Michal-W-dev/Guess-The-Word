import { FC, createContext, useEffect } from 'react';
import useOptionsState from '../hooks/useOptionsState'

interface InitData {
    name: string,
    maxWrong: number,
    changeName: (editedName: string) => void,
    changeMaxWrong: (editedMaxWrong: number) => void
}

// Get data from local storage
const storageData: any = JSON.parse(localStorage.getItem('storageData') || '')
const initData: InitData = storageData || { name: 1, maxWrong: 4 }


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