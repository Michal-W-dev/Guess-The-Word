import { styled, keyframes } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

// Keyframes animations
const tooltipArrowUp = keyframes`
    0% {
        transform: translateY(14px)
    }
`

const tooltipAppear = keyframes`
    0% {
        background: rgba(0,0,0,0);
        color: rgba(0,0,0,0);
        border-color: rgba(0,0,0,0);
    }
    40% {
        border-color: rgba(0,0,0,0);
    }
    60% {
        background: rgba(0,0,0,0);
        color: rgba(0,0,0,0);  
    }
    82% {border-color: rgba(56, 218, 255, 1);}
`

// Styles
export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.primary.main.slice(0, -1) + ',.95)',
        border: '1px solid rgba(56, 218, 255,.9)',
        fontSize: '1.5rem',
        borderRadius: '6px',
        padding: '7px 15px',
        animation: `${tooltipAppear} 1.7s`
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.primary.light,
        animation: `${tooltipArrowUp} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
    },
})
)