import sizes from './sizes'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [sizes.down('md')]: { paddingLeft: '1rem' },
        '& button': {
            [sizes.down('md')]: { display: 'none' },
        }
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        transition: '.45s ease-out',
        transform: 'scale(0,1) translate(150px)',
        marginLeft: '-70px'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: 'grey',
        '& > div': {
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'hsl(189, 100%, 60%)'
        },
        '& svg': {
            fontSize: '2.7rem',
            color: 'hsl(189, 100%, 60%)',
        },
        '& span': {
            fontSize: '2.1rem',
            color: 'aqua',
            fontFamily: 'Segoe UI',
            fontWeight: 300,
        }
    },
    listItem: {
        '&:hover': {
            background: 'rgba(0,0,0,.5)',
            boxShadow: 'inset 2px 0 2px hsl(189, 100%, 60%)'
        }
    },
    divider: {
        background: 'black',
        boxShadow: '0 1px 1px rgba(255,255,255,.5)'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        padding: theme.spacing(0),
        color: 'white',
        margin: '3.5%',
        width: '75%',
        [sizes.down('xlg')]: { width: '100%' },
        [sizes.down('md')]: { margin: 0 },
    },
});

export default styles;