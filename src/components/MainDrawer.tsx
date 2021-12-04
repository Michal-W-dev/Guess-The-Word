import React, { FC, useState, useContext } from 'react';
import { OptionsContext } from '../context/options.context';
import clsx from 'clsx';
import { withStyles, WithStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FaceIcon from '@mui/icons-material/Face';
import Icon7 from '@mui/icons-material/Filter7Outlined';
import Icon6 from '@mui/icons-material/Looks6Outlined';
import Icon5 from '@mui/icons-material/Looks5Outlined';
import Icon4 from '@mui/icons-material/Looks4Outlined';
import Icon3 from '@mui/icons-material/Looks3Outlined';
import Icon2 from '@mui/icons-material/LooksTwoOutlined';
import Icon1 from '@mui/icons-material/LooksOneOutlined';
import Form from './Form'
import styles from '../styles/MainDrawerStyles'


interface Props extends WithStyles<typeof styles> { };
interface ShowingForm { show?: boolean, tabIndex: number };

const MainDrawer: FC<Props> = ({ classes, children }) => {
    const theme = useTheme();
    const { maxWrong, name } = useContext(OptionsContext)

    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState({ show: false, tabIndex: 2 })

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const handleShowingForm = ({ show = false, tabIndex }: ShowingForm) => setShowForm({ show, tabIndex })


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
                // changeDifficulty={changeMaxWrong}
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
                    <p className='player-name'> Player: <span>{name}</span> </p>
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
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

export default withStyles(styles)(MainDrawer)