import { useState } from 'react';


const useOptionsState = (init) => {
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