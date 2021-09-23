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
// import ScoreHistoryIcon from '@material-ui/icons/FolderOpenOutlined';
import Icon7 from '@material-ui/icons/Filter7Outlined';
import Icon6 from '@material-ui/icons/Looks6Outlined';
import Icon5 from '@material-ui/icons/Looks5Outlined';
import Icon4 from '@material-ui/icons/Looks4Outlined';
import Icon3 from '@material-ui/icons/Looks3Outlined';
import Icon2 from '@material-ui/icons/LooksTwoOutlined';
import Icon1 from '@material-ui/icons/LooksOneOutlined';
import Form from './Form'
import styles from '../styles/MainDrawerStyles'

const MainDrawer = ({ classes, children, maxWrong, changeMaxWrong, name, changeName }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    // const [name, setName] = useState('1');


    const [showForm, setShowForm] = useState({ show: false, tabIndex: 2 })

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);


    const handleShowingForm = ({ show = false, tabIndex }) => setShowForm({ show, tabIndex })


    // const handleNameChange = (name) => setName(name)


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
                changeName={changeName}
                maxWrong={maxWrong}
                name={name}
                closeForm={handleShowingForm}
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
