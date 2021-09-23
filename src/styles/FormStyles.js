const styles = {
    dialog: {
        borderTop: '2px solid #3f51b5',
        borderBottom: '2px solid #3f51b5',
        // Avoid showing scroll at form animation
        '& #tabpanel-1': { overflowX: 'hidden' }
    },
    formTitle: {
        fontWeight: '400',
        fontSize: '2.1rem',
        marginBottom: '0.9rem'
    },
    form: {
        width: '100%',
        padding: '2rem',
        borderRadius: '5px',
        '& input': {
            width: '20rem',
            fontSize: '1.8rem',
        },
        '& button': {
            fontSize: '1rem',
            marginTop: '0.3rem'
        },
        '&.slideLeft': {
            animation: '$slideLeft .5s'
        },
        '&.slideRight': {
            animation: '$slideRight .5s'
        },
    },
    "@keyframes slideLeft": {
        "0%": {
            transform: 'translate(-100%)',
            background: 'lavender'
        },
        "100%": {
            transform: 'translate(0)',
        },
    },
    "@keyframes slideRight": {
        "0%": {
            transform: 'translate(100%)',
            background: 'lavender'
        },
        "100%": {
            transform: 'translate(0)',
        },
    },
    bottomBorder: {
        position: 'absolute',
        bottom: 0,
        height: '4px',
        width: '100%',
        backgroundColor: '#3f51b5',
    }
}

export default styles;