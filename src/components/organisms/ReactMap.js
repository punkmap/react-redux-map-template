import React from 'react';
import ReactDOM from 'react-dom'
import EsriLoaderReact from 'esri-loader-react'
import { loadModules } from 'esri-loader'
// import axios from 'axios'
import MapOverlayPanel from '../molecules/MapOverlayPanel/MapOverlayPanel'
import PopUp from '../molecules/PopUp/PopUp'
import './ReactMap.css'

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
  loadMap = ({loadedModules: [Map, MapView, FeatureLayer, GraphicsLayer, watchUtils], containerNode}) => {
    console.log('esriMapLoader');
    const self = this;
    
    let map = new Map({basemap: 'satellite'})
    
    let mv = new MapView({
      container: containerNode
      , center: [-78.78004, 35.78961]
      , zoom: 18
      , map: map
    }).when((function(mapView){
        self.setState({mapView:mapView})
        mapView.on('click', self.mapClick)
        mapView.popup.highlightEnabled = false;
        mapView.popup.actions = {}
        mapView.popup.watch('visible', function(e){
          if(e){self.setReactPopupContent()}
        })
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
    //console.log('quit clicking me mapPoint: ' + JSON.stringify(e.mapPoint));
      console.log('mapClick e: ', e);
      
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
          modulesToLoad={['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer', 'esri/layers/GraphicsLayer', 'esri/core/watchUtils']}    
          onReady={this.loadMap}
        />
        <MapOverlayPanel 
          view={this.state.mapView} 
          resultPinDragable={true}
          //hideSidePanel={false} 
          hideSidePanel_MapOverlay={this.state.hideSidePanel} 
        />
        
      </div>
    );
  }
}

export default ReactMap;