import { useNavigate } from "react-router-dom";
import { StyledRootDiv } from '../styles/StartScreenStyles'


const StartScreen = () => {

    let navigate = useNavigate();
    const handleEndOfAnimation = () => navigate('/game')

    return (
        <StyledRootDiv className='StartScreen' color='red'>
            <div className='background' />
            <div className='text1' >
                Welcome to the "Guess The Word" game.
            </div>
            <div className='text2' onAnimationEnd={handleEndOfAnimation}>
                The game is about to start now!
            </div>
            <div className='loaderContainer'>
                <div className='loaderTitle'>Guess The Word</div>
                <div className='loader'><div /></div>
            </div>
        </StyledRootDiv>
    )
}

export default StartScreen;
