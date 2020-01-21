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
import DeleteIcon from '@material-ui/icons/DeleteForever';
import NavigationIcon from '@material-ui/icons/DoneAll';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Fab from '@material-ui/core/Fab';
import AppBar from 'material-ui/AppBar';
import Fade from '@material-ui/core/Fade';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
// import FormLabel from '@material-ui/core/FormLabel'
// import Icon from '@material-ui/core/Icon';
import './SidePanel.css';




function handleClick(event) {
    console.log('shut the door')
}
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
            pointerEvents: 'auto'
            , sidePanelClasses: ['sidePanel', 'pointerEventsInactive']
            , textFieldClasses: [classes.textField, classes.pointerEventsInactive]
        };
        
        this.sideNav = React.createRef();
    }
    update = (e) => {
        console.log(e.target.value);
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
        console.log('SIDENAV did mount');
        this.sideNav = React.createRef();
    }
    componentDidUpdate() {
        console.log('this.props.hideSidePanel: ', this.props.hideSidePanel);
        console.log('SIDEPANEL.componentDidUpdate')
        console.log('this.props.hideSidePanel: ' + this.props.hideSidePanel);
        const { classes } = this.props;
        //console.log('this.state.textFieldClasses: ' + JSON.stringify(this.state.textFieldClasses))
        console.log('this.state.sidePanelClasses: ' + this.state.sidePanelClasses);
        if(!this.props.hideSidePanel && this.state.sidePanelClasses !== ['sidePanel', 'pointerEventsActive']){
            //this.setState({sidePanelClasses : ['sidePanel', 'sidePanelInactive']})        
            this.state.sidePanelClasses.splice(-1, 1)
            console.log('this.state.sidePanelClasses makeInactive: ' + this.state.sidePanelClasses);
            this.state.sidePanelClasses.push('pointerEventsActive')
            console.log('this.state.sidePanelClasses makeInactive: ' + this.state.sidePanelClasses);
            //this.state.textFieldClasses.splice(-1, 1)
            //console.log('this.state.textFieldClasses.slice: ' + JSON.stringify(this.state.textFieldClasses))
            //this.state.textFieldClasses.push(classes.pointerEventsActive)
        } 
        else if (this.props.hideSidePanel && this.state.sidePanelClasses !== ['sidePanel', 'pointerEventsInactive']) {
            //this.setState({sidePanelClasses : ['sidePanel', 'sidePanelActive']})
            this.state.sidePanelClasses.splice(-1, 1)
            console.log('this.state.sidePanelClasses makeActive: ' + this.state.sidePanelClasses);
            this.state.sidePanelClasses.push('pointerEventsInactive')
            console.log('this.state.sidePanelClasses makeActive: ' + this.state.sidePanelClasses);
            //this.state.textFieldClasses.splice(-1, 1)
            //this.state.textFieldClasses.push(classes.pointerEventsInactive)
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