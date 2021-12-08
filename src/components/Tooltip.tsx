import { FC, useState } from 'react'
import { StyledTooltip } from '../styles/TooltipStyles'

interface Props { title: string, isDisabled: boolean }


const CustomTooltip: FC<Props> = (props) => {
    const { title, children, isDisabled, ...otherProps } = props;

    const [tooltipOpen, setTooltipOpen] = useState(false)
    const handleTooltip = (bool: boolean) => setTooltipOpen(bool)

    return (
        <StyledTooltip
            onMouseEnter={() => { handleTooltip(true) }}
            onMouseOut={() => { handleTooltip(false) }}
            onClick={() => { handleTooltip(false) }}
            open={isDisabled ? false : tooltipOpen}
            title={title}
            placement="bottom"
            // classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
            {...otherProps}
        ><span>{children}</span>
        </StyledTooltip>
    )
}

CustomTooltip.defaultProps = {
    isDisabled: false
}

export default CustomTooltip;