import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { defaultFunction, setConfig } from './actions';
import ReactMap from './components/organisms/ReactMap';

import config from './App.config'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      config: config
    }
  }
  componentDidMount() {
    // call default function to display redux operation
    this.props.defaultFunction();
    this.props.setConfig(config);// .setConfig(config);
  }
  render() {
    console.log('render config: ', config);
    return (
      <div>
        {/* <ReactScene /> */}
        <ReactMap config={this.state.config}/>
      </div>
    );
  }
}

// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    default: state.default
  };
}

export default connect(mapStateToProps, { defaultFunction, setConfig })(App);
