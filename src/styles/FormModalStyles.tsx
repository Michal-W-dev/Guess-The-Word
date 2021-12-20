import { styled, keyframes } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';


// Keyframes animations
const slideLeft = keyframes`
    0% {
        transform: translate(-100%);
        background: lavender;
    },
    100% {
        transform: translate(0);
    },
}
`
const slideRight = keyframes`
    0% {
        transform: translate(100%);
        background: lavender;
    },
    100% {
        transform: translate(0);
    },
}
`

// Styles
export const StyledDialog = styled(Dialog)`
    border-top: 2px solid #3f51b5;
    border-bottom: 2px solid #3f51b5;
    /* Avoid showing scroll at form animation */
    #tabpanel-1 { overflow-x: hidden }
    .tab {
        font-size: 1.4em
    }
`

export const StyledRootDiv = styled('div')`
    .dialog {
        border-top: 2px solid #3f51b5;
        border-bottom: 2px solid #3f51b5;
        /* Avoid showing scroll at form animation */
        #tabpanel-1 { overflow-x: hidden }
        .tab {
            font-size: 1.4em
        }
    }
    .formTitle {
        font-weight: 400;
        font-size: 2rem;
        margin-bottom: 0.9rem
    }
    .form {
        width: 39rem;
        height: 17rem;
        padding: 2rem;
        border-radius: 5px;
        input {
            width: 32rem;
            font-size: 1.75rem;
            padding: 1.1rem;
            padding-left: 1.5rem;
        }
        label[data-shrink='false'] {
            font-size:14px;
            transform: translate(14px, 13px);
        }
        label[data-shrink='true'] {
            transform: translate(13px, -5px) scale(0.85);
        }
        .btns-container {
            text-align: right;
            & button {
                font-size: 1rem;
                margin-top: 1rem;
            }
        }
    }
    .bottomBorder {
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: #3f51b5;
    }
    .slideLeft {
        animation: ${slideLeft} .5s
    }
    .slideRight {
        animation: ${slideRight} .5s
    }
`
