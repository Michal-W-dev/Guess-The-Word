import { useState, useEffect, useRef, RefObject } from 'react';

interface FetchedData {
    answer: string;
    constraint: string;
    category: string;
    tags: string;
    def: string[];
    numSyllables: number;
}

const useHeightAnimHook = (fetchedData: FetchedData, isWinner: boolean, lostGame: boolean): [number, RefObject<HTMLDivElement>] => {
    const [height, setHeight] = useState(90)
    const ref = useRef<HTMLDivElement>(null)

    // Update height if (fetchedData, isWinner, lostGame)
    useEffect(() => {
        // setTimeout - fixes issue with not correctly assessing height on refresh at Chrome browser.
        setTimeout(() => setHeight(ref.current!.scrollHeight + 70), 50)
    }, [fetchedData, isWinner, lostGame])
    return [height, ref]
}

export default useHeightAnimHook