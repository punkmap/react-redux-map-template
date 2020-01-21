import React, { Component } from 'react'
//import { loadModules } from 'esri-loader'
import MapSearch from '../MapSearch/MapSearch'
import './MapOverlayPanel.css'
import Grid from '@material-ui/core/Grid'
class MapOverlayPanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      hideSidePanel: true
    }
  } 
  setProjectCallback = (value) =>{
    //this.setState({project:value})
    console.log(this.state.project)
    this.props.projectCallback(value)
  }
  setPhaseCallback = (value) =>{
    //this.setState({phase:value})
    console.log(this.state.phase)
    this.props.phaseCallback(value)
  }
  componentDidUpdate = () => {
    console.log('MAPOVERLAYPANEL.componentDidUpdate this.state.hodeSidePanel: ' + this.state.hodeSidePanel)
  }
  render() {
    return (
      <div className="mapOverlayPanel">
        <Grid
          container
          spacing={10}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <MapSearch 
            view={this.props.view} 
            resultPinDragable={true}
          />
          
        </Grid>
      </div>
    )
  }
}

export default MapOverlayPanel