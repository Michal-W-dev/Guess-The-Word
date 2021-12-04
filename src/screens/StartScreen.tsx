import { FC } from 'react'
import { withStyles, WithStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import styles from '../styles/StartScreenStyles'


interface Props extends WithStyles<typeof styles> { };

const StartScreen: FC<Props> = ({ classes }) => {

    let navigate = useNavigate();
    const handleEndOfAnimation = () => navigate('/game')

    return (
        <div className={classes.root}>
            <div className={classes.background} />
            <div className={classes.text1} >
                Welcome to the "Guess The Word" game.
            </div>
            <div className={classes.text2} onAnimationEnd={handleEndOfAnimation}>
                The game is about to start now!
            </div>
            <div className={classes.loaderContainer}>
                <div className={classes.loaderTitle}>Guess The Word</div>
                <div className={classes.loader}>
                    <div />
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(StartScreen);
