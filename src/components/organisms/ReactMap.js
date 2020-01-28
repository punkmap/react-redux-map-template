import React from 'react';
import ReactDOM from 'react-dom'
import EsriLoaderReact from 'esri-loader-react'
import { loadModules } from 'esri-loader'
// import axios from 'axios'
import MapOverlayPanel from '../molecules/MapOverlayPanel/MapOverlayPanel'
import PopUp from '../molecules/PopUp/PopUp'
import './ReactMap.css'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateMapclickCoordinates, updateCenterpointCoordinates } from '../../actions'


class ReactMap extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      ctrlKey: false
      , mapView: null
      , hideSidePanel: true
      // , parcelData: null
      , realEstateData: null
    }
    this.mapClick = this.mapClick.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    const self = this
    function keyDown(e) {
      if (e.ctrlKey&&!self.state.ctrlKey){
        self.setState({ctrlKey: true})
      }
    }
    function keyUp(e) {
      if (self.state.ctrlKey){self.setState({ctrlKey: false})}
    }
  }
  loadMap = ({loadedModules: [Map, Graphic, MapView, FeatureLayer, GraphicsLayer, watchUtils, Locate], containerNode}) => {
    const self = this;
    
    let map = new Map({basemap: 'satellite'})
    
    let mv = new MapView({
      container: containerNode
      , center: [-98.23, 39.39]
      , zoom: 5
      , map: map
    }).when((function(mapView){
        self.setState({mapView:mapView})
        mapView.on('click', self.mapClick)

        mapView.watch('extent', self.mapCenter);

        mapView.popup.highlightEnabled = false;
        mapView.popup.actions = {}
        mapView.popup.watch('visible', function(e){
          if(e){self.setReactPopupContent()}
        })
        var locateWidget = new Locate({
          view: mapView,   // Attaches the Locate button to the view
        })
        
        mapView.ui.add(locateWidget, "top-left");
        // locateWidget.locate();
    }));
  }
  
  setReactPopupContent = () => {
    const self = this
    
    let puNode = document.createElement("div");
    self.state.mapView.popup.content = puNode
    
    ReactDOM.render(
      <PopUp data={self.state.data} />,
      puNode
    );
    //self.state.mapView.popup.open();
  }
  mapClick = (e) => {
      console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
      const coords = { lat: e.mapPoint.latitude.toFixed(5).toString(), lon: e.mapPoint.longitude.toFixed(5).toString()};
      this.props.updateMapclickCoordinates(coords);
  }
  mapCenter = (e) => {
    //console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
    const coords = { lat: e.center.latitude, lon: e.center.longitude };
    // setTimeout(function(){ 
    //   console.log('setTimeOut: ', e);
    //   //this.props.updateCenterpointCoordinates(coords);// .updateCenterpointCoordinates(coords);
    // }, 500);  
    console.log('mapCenter e: ', e);
    this.props.updateCenterpointCoordinates(coords);// .updateCenterpointCoordinates(coords);
    
    // const coordString = e.mapPoint.latitude.toFixed(5).toString() + " " + e.mapPoint.longitude.toFixed(5).toString();
  }
  
  
  render() {

    //var fl = new FeatureLayer(url);

    const options = {
      url: 'https://js.arcgis.com/4.10/'
    };

    return (
      <div className="ReactScene">
        <EsriLoaderReact 
          options={options}
          modulesToLoad={['esri/Map', 'esri/Graphic', 'esri/views/MapView','esri/layers/FeatureLayer', 'esri/layers/GraphicsLayer', 'esri/core/watchUtils', 'esri/widgets/Locate']}    
          onReady={this.loadMap}
        />
        <MapOverlayPanel 
          view={this.state.mapView} 
          resultPinDragable={true}
          hideSidePanel={false} 
          hideSidePanel_MapOverlay={this.state.hideSidePanel} 
        />
        
      </div>
    );
  }
}
ReactMap.propTypes = {
  updateMapclickCoordinates: PropTypes.func.isRequired,
  updateCenterpointCoordinates: PropTypes.func.isRequired
};

export default connect(null, { updateMapclickCoordinates, updateCenterpointCoordinates })(ReactMap);