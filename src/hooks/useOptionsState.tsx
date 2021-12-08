import { useState } from 'react';

interface Init {
    name: string;
    maxWrong: number;
}

const useOptionsState = (init: Init): {
    name: string,
    maxWrong: number,
    changeName: (editedName: string) => void,
    changeMaxWrong: (editedMaxWrong: number) => void
} => {
    const [maxWrong, setMaxWrong] = useState(init.maxWrong)
    const [name, setName] = useState(init.name)

    return {
        name,
        changeName: (editedName) => setName(editedName),
        maxWrong,
        changeMaxWrong: (editedMaxWrong) => setMaxWrong(editedMaxWrong),
    }
}

export default useOptionsState