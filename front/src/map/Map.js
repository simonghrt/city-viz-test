import React, { Component } from 'react';
import './Map.css';
import L from 'leaflet';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {}
        };
    }

    componentDidMount() {
        this.state.map = L.map('map').setView([46.990792, 2.7699], 6);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic2ltb25naHJ0IiwiYSI6ImNqbHR2enUzazBkcmgza3BlM2V6MXRoa3UifQ.Kdzk-KhHUjaZSKZDVMwSuQ'
        }).addTo(this.state.map);
    }

    componentDidUpdate() {
        if (Object.keys(this.props.geometry).length > 0) {
            L.geoJSON(this.props.geometry).addTo(this.state.map);
        }
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}

export default Map;
