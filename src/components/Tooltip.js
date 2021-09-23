import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/TooltipStyles'

const CustomTooltip = (props) => {
    const { classes, title, children, isDisabled, ...otherProps } = props;

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const handleTooltip = bool => setTooltipOpen(bool)

    return (
        <Tooltip
            onMouseEnter={() => { handleTooltip(true) }}
            onMouseOut={() => { handleTooltip(false) }}
            onClick={() => { handleTooltip(false) }}
            open={isDisabled ? false : tooltipOpen}
            arrow
            title={title}
            placement="bottom"
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