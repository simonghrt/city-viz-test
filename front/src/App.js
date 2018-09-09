import React, { Component } from 'react';
import './App.css';
import Map from './map/Map';
import Inputs from "./inputs/Inputs";

class App extends Component {
    constructor () {
        super();
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
                <Map geometry={this.state.geometry} />
                <Inputs onGeometryChange={this.geometryUpdate} />
            </div>
        );
    }
}

export default App;
