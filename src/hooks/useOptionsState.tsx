import { useState } from 'react';

interface Init {
    name: string,
    maxWrong: number,
    colorNumber: number
}

const useOptionsState = (init: Init) => {
    const [maxWrong, setMaxWrong] = useState(init.maxWrong)
    const [name, setName] = useState(init.name)
    const [colorNumber, setColorNumber] = useState(init.colorNumber)

    return {
        name,
        changeName: (editedName: string) => setName(editedName),
        maxWrong,
        changeMaxWrong: (editedMaxWrong: number) => setMaxWrong(editedMaxWrong),
        colorNumber,
        changeColor: (editedColor: number) => setColorNumber(editedColor),
        // col,
    }
}

export default useOptionsState