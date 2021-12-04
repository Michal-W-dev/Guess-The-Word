import { useState, useEffect, useRef } from 'react';



const useHeightAnimHook = (fetchedData, isWinner, lostGame) => {
    // const useHeightAnimHook = (fetchedData: any, isWinner: boolean, lostGame: boolean): [number, React.RefObject<HTMLDivElement>] => {
    const [height, setHeight] = useState(90)
    const ref = useRef()
    // const ref = useRef<HTMLDivElement | any>(null)

    // Update height if (fetchedData, isWinner, lostGame)
    useEffect(() => {
        setHeight(ref.current.scrollHeight + 70)
    }, [fetchedData, isWinner, lostGame])
    return [height, ref]
}

export default useHeightAnimHook