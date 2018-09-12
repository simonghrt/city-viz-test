import React, { Component } from 'react';
import './App.css';
import Map from './map/Map';
import Inputs from "./inputs/Inputs";

class App extends Component {
    constructor () {
        super();
        // this.map = {};
        this.state = {
            geometry: {}
        };
        this.geometryUpdate = this.geometryUpdate.bind(this);
    }

    geometryUpdate(geo) {
        this.setState({geometry: geo});
    }

    render() {
        return (
            <div className="App">
                <Map geometry={this.state.geometry} ref={ instance => { this.map = instance; }}/>
                <Inputs onGeometryChange={this.geometryUpdate} onClearMap={() => {this.map.clearMap(); }}/>
            </div>
        );
    }
}

export default App;
