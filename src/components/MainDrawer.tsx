import { FC, useState, useContext } from 'react';
import { OptionsContext } from '../context/options.context';
import FaceIcon from '@mui/icons-material/Face';
import Icon7 from '@mui/icons-material/Filter7Outlined';
import Icon6 from '@mui/icons-material/Looks6Outlined';
import Icon5 from '@mui/icons-material/Looks5Outlined';
import Icon4 from '@mui/icons-material/Looks4Outlined';
import Icon3 from '@mui/icons-material/Looks3Outlined';
import Icon2 from '@mui/icons-material/LooksTwoOutlined';
import Icon1 from '@mui/icons-material/LooksOneOutlined';
import Form from './Form'
import { AppBar, Drawer, DrawerHeader, StyledRootDiv } from '../styles/MainDrawerStyles'
import { useTheme } from '@mui/material/styles';
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


interface ShowingForm { show?: boolean, tabIndex: number };


const MainDrawer: FC = ({ children }) => {
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
        <StyledRootDiv className='root'>
            <Form
                showForm={showForm}
                closeForm={handleShowingForm}
            />
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                    ><MenuIcon />
                    </IconButton>
                    <p className='player-name'> Player: <span>{name}</span> </p>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}  >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider className='divider' />
                <List>
                    <ListItem button className='listItem' onClick={() => handleShowingForm({ show: true, tabIndex: 0 })}>
                        <ListItemIcon><FaceIcon /></ListItemIcon>
                        <ListItemText primary='Player name' />
                    </ListItem>
                    <ListItem button className='listItem' onClick={() => handleShowingForm({ show: true, tabIndex: 1 })}>
                        <ListItemIcon>
                            {renderNumber()}
                        </ListItemIcon>
                        <ListItemText primary='Difficulty' />
                    </ListItem>
                </List>
                <Divider className='divider' />
            </Drawer>
            <main className='content'>
                <div className='toolbar' />
                {children}
            </main>
        </StyledRootDiv>
    );
}

export default MainDrawer