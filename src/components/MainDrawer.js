import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import ScoreHistoryIcon from '@material-ui/icons/FolderOpenOutlined';
import Icon7 from '@material-ui/icons/Filter7Outlined';
import Icon6 from '@material-ui/icons/Looks6Outlined';
import Icon5 from '@material-ui/icons/Looks5Outlined';
import Icon4 from '@material-ui/icons/Looks4Outlined';
import Icon3 from '@material-ui/icons/Looks3Outlined';
import Icon2 from '@material-ui/icons/LooksTwoOutlined';
import Icon1 from '@material-ui/icons/LooksOneOutlined';
import Form from './Form'
import sizes from '../styles/sizes'

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
            // color: 'hsl(180, 100%, 50%)',
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
        // flexGrow: 1,
        padding: theme.spacing(0),
        color: 'white',
        margin: '3.5%',
        width: '75%',
        [sizes.down('xlg')]: { width: '100%' },
        [sizes.down('md')]: { margin: 0 },
    },
});

const MainDrawer = ({ classes, children, maxWrong, changeMaxWrong }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('Mike');


    const [showForm, setShowForm] = useState({ show: false, tabIndex: 2 })

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);


    const handleShowingForm = ({ show = false, tabIndex }) => setShowForm({ show, tabIndex })


    const handleNameChange = (name) => setName(name)


    const renderNumber = () => (
        (maxWrong === 7) ? <Icon7 />
            : (maxWrong === 6) ? <Icon6 />
                : (maxWrong === 5) ? <Icon5 />
                    : (maxWrong === 4) ? <Icon4 />
                        : (maxWrong === 3) ? <Icon3 />
                            : (maxWrong === 2) ? <Icon2 /> : <Icon1 />
    )

    return (
        <div className={classes.root}>
            <Form
                showForm={showForm}
                changeDifficulty={changeMaxWrong}
                changeName={handleNameChange}
                closeForm={handleShowingForm}
                maxWrong={maxWrong}
                name={name}
            />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <p style={{ fontSize: '30px' }}> Player: <span style={{ fontWeight: '400' }}>{name}</span> </p>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider className={classes.divider} />
                <List >
                    <ListItem button className={classes.listItem} onClick={() => handleShowingForm({ show: true, tabIndex: 0 })}>
                        <ListItemIcon><FaceIcon /></ListItemIcon>
                        <ListItemText primary='Player name' />
                    </ListItem>
                    <ListItem button className={classes.listItem} onClick={() => handleShowingForm({ show: true, tabIndex: 1 })}>
                        <ListItemIcon>
                            {renderNumber()}
                        </ListItemIcon>
                        <ListItemText primary='Difficulty' />
                    </ListItem>

                </List>
                <Divider className={classes.divider} />
                {/* <List>
                    <ListItem button className={classes.listItem}>
                        <ListItemIcon> <ScoreHistoryIcon /></ListItemIcon>
                        <ListItemText primary='Last scores' />
                    </ListItem>
                </List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

export default withStyles(styles, { widthTheme: true })(MainDrawer)
