import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    tooltip: {
        backgroundColor: 'rgba(41, 73, 255, 0.8)',
        fontSize: '1.5rem',
        borderRadius: '5px',
        padding: '7px 15px',
        display: props => props.isDisabled ? 'none' : 'block',
    },
    tooltipArrow: {
        color: 'rgba(41, 73, 255, 0.9)',
    },
}


const CustomTooltip = (props) => {
    const { classes, title, children, isDisabled, ...otherProps } = props;
    return (
        <Tooltip
            arrow
            title={title}
            placement="bottom"
            enterDelay={700}
            classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
            {...otherProps}
        >{children}
        </Tooltip>
    )
}

CustomTooltip.defaultProps = {
    isDisabled: false
}

export default withStyles(styles)(CustomTooltip);