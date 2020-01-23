import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AppBar from 'material-ui/AppBar';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import './SidePanel.css';

import store from '../../../store'
import watch from 'redux-watch';

function getPointerEvents(){
    return true
}
const styles = theme => ({
    // root:{
    //     pointerEvents: this.getPointerEvents
    // },
    appBar: {
      position: 'relative',
    }
    , textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
    }
    , pointerEventsActive: {
        pointerEvents: 'auto'
    }
    , pointerEventsInactive: {
        pointerEvents: 'none'
    }
    , paper: {
        paddingTop: theme.spacing() * 2,
        paddingBottom: theme.spacing() * 2,
    }
    , type: {
        width: '100%',
        maxWidth: 500,
        paddingLeft: 15
    }
    , typeTitle: {
        paddingTop: 5
    }
    , addButton: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    }
    , deleteButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    }
    , extendedIcon: {
        marginRight: theme.spacing()*2,
    }

  });

class SidePanel extends Component {
    constructor(props){
        super(props);
        
        const { classes } = this.props;
        this.state = {
            pointerEvents: 'auto',
            sidePanelClasses: ['sidePanel', 'pointerEventsInactive'],
            textFieldClasses: [classes.textField, classes.pointerEventsInactive],
        };
        
        this.sideNav = React.createRef();
        // store.subscribe(() => {
        //     console.log(store.getState())
        //     const clickPoint = store.getState().map.clickCoordinates;
        //     const coords = clickPoint.lat + ' ' + clickPoint.lon;
        //     console.log(clickPoint)
        //     this.setState({
        //         clickCoordinates: coords
        //     })
        // });
        const clickPointWatch = watch(store.getState, 'map.clickCoordinates')
        store.subscribe(clickPointWatch((newVal, oldVal, objectPath) => {
            const clickPoint = store.getState().map.clickCoordinates;
            const coords = newVal.lat + ' ' + newVal.lon;
            console.log(clickPoint)
            this.setState({
                clickCoordinates: coords
            })
        }))
        const centerPointWatch = watch(store.getState, 'map.centerpointCoordinates')
        store.subscribe(centerPointWatch((newVal, oldVal, objectPath) => {
            const centerpoint = store.getState().map.centerpointCoordinates;
            const coords = newVal.lat + ' ' + newVal.lon;
            this.setState({
                centerpointCoordinates: coords,
            })
        }))


        const titleWatch = watch(store.getState, 'config.config.title')
        store.subscribe(titleWatch((newVal, oldVal, objectPath) => {
            console.log('title new val and old val: ', newVal + ' ' + oldVal);
            this.setState({
                configTitle: newVal,
            })
        }))
        this.configTest = store.getState().config.config.title;
        console.log('this.configTest: ',  this.configTest);
    }
    update = (e) => {
        this.props.onUpdate(e.target.value);
        this.setState({fieldVal: e.target.value});
    };
    handleClose = key => e => {
        console.log('key: ' + key) 
        key === 'add'? this.setState({titleBarTitle: 'Add Project'}) : this.setState({titleBarTitle: 'Remove Project'})
        this.setState({editAction:key})
        this.setState({anchorEl : null})
    }
    getPointerEvents = () => {
        return true
    }
    componentDidMount = () => {
        this.sideNav = React.createRef();
    }
    componentDidUpdate() {
        const { classes } = this.props;
        if(!this.props.hideSidePanel && this.state.sidePanelClasses !== ['sidePanel', 'pointerEventsActive']){
            this.state.sidePanelClasses.splice(-1, 1)
            this.state.sidePanelClasses.push('pointerEventsActive')
        } 
        else if (this.props.hideSidePanel && this.state.sidePanelClasses !== ['sidePanel', 'pointerEventsInactive']) {
            this.state.sidePanelClasses.splice(-1, 1)
            this.state.sidePanelClasses.push('pointerEventsInactive')
        }
    }
    render() {
        const { classes } = this.props;
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            {/* <IconButton class='sideNavButton'><NavigationClose /></IconButton> */}
            <div >
                <Fade in={!this.props.hideSidePanel} timeout={1000}>
                    <Paper className={this.state.sidePanelClasses.join(' ')} >
                        <AppBar className={classes.appBar} title={this.state.titleBarTitle} iconElementLeft={(
                            <IconButton color="inherit" aria-label="Menu" 
                                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true" 
                                onClick={this.menuClick}>
                                <MenuIcon />
                            </IconButton>)} 
                        >
                        <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onChange={this.handleClose}>
                            <MenuItem onClick={this.handleClose('add')}>Add</MenuItem>
                            <MenuItem onClick={this.handleClose('remove')}>Remove</MenuItem>
                        </Menu>
                        </AppBar>
                        <h2>{this.state.configTitle}</h2>
                        <h3>centerpoint coords: {this.state.centerpointCoordinates}</h3>
                        <h3>click coords: {this.state.clickCoordinates}</h3>
                    </Paper>
                </Fade>
            </div>
        </MuiThemeProvider>
        );
    }
}
SidePanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(SidePanel);