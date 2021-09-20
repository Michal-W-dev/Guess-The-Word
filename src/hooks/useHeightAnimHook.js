import { useState, useEffect, useRef } from 'react';


const useHeightAnimHook = (fetchedData, isWinner, lostGame) => {
    const [height, setHeight] = useState(90)
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.scrollHeight + 70)
    }, [fetchedData, isWinner, lostGame])
    return [height, ref]
}

export default useHeightAnimHook