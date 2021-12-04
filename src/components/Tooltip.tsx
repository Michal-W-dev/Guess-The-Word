import React, { FC, useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/TooltipStyles'

interface Props extends WithStyles<typeof styles> {
    title: string, isDisabled: boolean,
}

const CustomTooltip: FC<Props> = (props) => {
    const { classes, title, children, isDisabled, ...otherProps } = props;

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const handleTooltip = (bool: boolean) => setTooltipOpen(bool)

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
        ><>{children}</>
        </Tooltip>
    )
}

CustomTooltip.defaultProps = {
    isDisabled: false
}

export default withStyles(styles)(CustomTooltip);