import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/StartScreenStyles'


const StartScreen = ({ classes, history }) => {

    const handleEndOfAnimation = () => history.push('/game')

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
