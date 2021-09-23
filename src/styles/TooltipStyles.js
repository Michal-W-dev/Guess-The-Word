const styles = {
    tooltip: {
        backgroundColor: 'rgba(41, 73, 255, 0.8)',
        fontSize: '1.5rem',
        borderRadius: '6px',
        padding: '7px 15px',
        // display: props => props.isDisabled ? 'none' : 'block',
        animation: '$tooltipAppear 1.7s'
    },
    tooltipArrow: {
        color: 'hsla(210, 100%, 60%, .6)',
        animation: '$tooltipArrowUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
    },
    "@keyframes tooltipAppear": {
        "0%": {
            background: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
        "60%": {
            background: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
        },
    },
    "@keyframes tooltipArrowUp": {
        "0%": {
            transform: 'translateY(14px)'
        },
    },
}

export default styles