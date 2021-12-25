import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import sizes from './sizes'

const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    [sizes.down('lg')]: {
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
    },
});


const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    '& .player-name': {
        fontSize: '30px',
        '& span': { fontWeight: '400' }
    },
    [sizes.down('lg')]: { paddingLeft: '1rem' },
    '& button': {
        [sizes.down('xlg')]: { display: 'none' },
    },
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [sizes.down('xlg')]: { width: '100%' },
    }),
}));


export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: 'grey',
        // boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            [sizes.down('xlg')]: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
        '& > div': {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        '& svg': {
            fontSize: '2.7rem',
            color: theme.palette.primary.light,
        },
        '& span': {
            fontSize: '2.1rem',
            fontFamily: 'Segoe UI',
            fontWeight: 300,
            color: theme.palette.primary.light,
        },
        '& .listItem': {
            '&:hover': {
                background: 'rgba(0,0,0,.5)',
                boxShadow: ('inset 1px 0 1px 1px ' + theme.palette.primary.light),
            }
        },
        '& .divider': {
            background: 'black',
            boxShadow: '0 1px 1px rgba(255,255,255,.5)'
        },
    }),
);


export const StyledRootDiv = styled('div')({
    display: 'flex',
    overflow: 'hidden',
    '& .content': {
        color: 'white',
        margin: '6%',
        width: '75%',
        [sizes.down('xlg')]: { width: '100%', margin: '8% 5%' },
        [sizes.down('md')]: { margin: 0 },
    }
})
