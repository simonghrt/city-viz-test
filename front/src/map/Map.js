import React, { Component } from 'react';
import './Map.css';
import L from 'leaflet';

L.Map.include({
  'clearLayers': function () {
    this.eachLayer(function (layer) {
      if (layer.hasOwnProperty('feature')) {
          this.removeLayer(layer);
      }
    }, this);
  }
});

/**
 * Class that displays a leaflet map
 * @extends Component
 */
class Map extends Component {

    /**
    * Create a Map component
    * @param {object} props - The properties that are given to the map
    */
    constructor(props) {
        super(props);
        this.state = {
            map: {}
        };
        this.clearMap = this.clearMap.bind(this);
    }

    /**
    * Creation of the map - Called after the component is mounted (inserted into the tree)
    */
    componentDidMount() {
        // We set the original view and zoom in order to see the center of France and see the entire country
        this.state.map = L.map('map').setView([46.990792, 2.7699], 6);
        // We load the mapbox layer
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic2ltb25naHJ0IiwiYSI6ImNqbHR2enUzazBkcmgza3BlM2V6MXRoa3UifQ.Kdzk-KhHUjaZSKZDVMwSuQ'
        }).addTo(this.state.map);
    }

    /**
    * Updates the map with the new geometry to add - Called when props is updated (state of the parent changed)
    */
    componentDidUpdate() {
        if (Object.keys(this.props.geometry).length > 0) {
            L.geoJSON(this.props.geometry).addTo(this.state.map);
        }
    }

    clearMap() {
        this.state.map.clearLayers();
    }

    /**
    * Renders the map
    */
    render() {
        return (
            <div id="map"></div>
        );
    }
}

export default Map;
