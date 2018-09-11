import React, { Component } from 'react';
import './Inputs.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Tabs, Tab } from 'react-bootstrap';

const rp = require('request-promise');

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

/**
 * Class that deals with the user inputs and gets the geometries
 * @extends Component
 */
class Inputs extends Component {

    /**
    * Create a Inputs component
    */
    constructor() {
        super();

        this.API_URL = "https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev/";

        // Initialization of the state
        this.state = {
            lat: "",
            lon: "",
            city: "",
            type: "area"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitName = this.handleSubmitName.bind(this);
        this.handleSubmitCoords = this.handleSubmitCoords.bind(this);
    }

    /**
    * Handles the inputs changes
    * @param {object} event - The event that was triggered
    */
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    /**
    * Handles the submit with a name input
    * @param {object} event - The event that was triggered
    */
    handleSubmitName(event) {
        let uriReq = "";
        if (this.state.type === "area") {
            uriReq = this.API_URL + "city/area";
        } else {
            uriReq = this.API_URL + "city/centre";
        }

        let options = {
            method: 'POST',
            uri: uriReq,
            body: {
                name: this.state.city
            },
            json: true
        };

        rp(options)
        .then((geometries) => {
            this.props.onGeometryChange(geometries);
            this.setState({
                lat: "",
                lon: "",
                city: ""
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
    * Handles the submit with latitude and longitude inputs
    * @param {object} event - The event that was triggered
    */
    handleSubmitCoords(event) {
        let uriReq = "";
        if (this.state.type === "area") {
            uriReq = this.API_URL + "city/area";
        } else {
            uriReq = this.API_URL + "city/centre";
        }

        let options = {
            method: 'POST',
            uri: uriReq,
            body: {
                lat: this.state.lat,
                lon: this.state.lon
            },
            json: true
        };

        rp(options)
        .then((geometries) => {
            this.props.onGeometryChange(geometries);
            this.setState({
                lat: "",
                lon: "",
                city: ""
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
    * Renders the map
    */
    render() {
        return (
            <div id="inputs">
                <div id="inputs-content">
                    <h3>CityViz</h3>
                    <Tabs defaultActiveKey={2} id="tabs-main">
                        <Tab eventKey={1} title="Lat/Lon">
                            <p>
                                Il vous suffit de préciser une latitude et longitude afin de visualiser la ville correspondante
                            </p>
                            <form>
                                <FieldGroup
                                  id="formLat"
                                  type="text"
                                  label="Latitude"
                                  placeholder="Entrer la latitude"
                                  value={this.state.lat}
                                  name="lat"
                                  onChange={this.handleInputChange}
                                />
                                <FieldGroup
                                  id="formLon"
                                  type="text"
                                  label="Longitude"
                                  placeholder="Entrer la longitude"
                                  value={this.state.lon}
                                  name="lon"
                                  onChange={this.handleInputChange}
                                />
                                <FormGroup controlId="formControlsSelect">
                                  <ControlLabel>Géométrie</ControlLabel>
                                  <FormControl componentClass="select" placeholder="select" value={this.state.type} onChange={this.handleInputChange} name="type">
                                    <option value="center">Centre</option>
                                    <option value="area">Contour</option>
                                  </FormControl>
                                </FormGroup>
                                <Button onClick={this.handleSubmitCoords}>Visualiser</Button>
                            </form>
                        </Tab>
                        <Tab eventKey={2} title="Nom">
                            <p>
                                Il vous suffit de préciser le nom d une ville afin de visualiser la ville correspondante
                            </p>
                            <form>
                                <FieldGroup
                                  id="formName"
                                  type="text"
                                  label="Nom"
                                  placeholder="Entrer le nom d'une ville"
                                  value={this.state.city}
                                  name="city"
                                  onChange={this.handleInputChange}
                                />
                                <FormGroup controlId="formControlsSelect">
                                  <ControlLabel>Géométrie</ControlLabel>
                                  <FormControl componentClass="select" placeholder="select" value={this.state.type} onChange={this.handleInputChange} name="type">
                                    <option value="center">Centre</option>
                                    <option value="area">Contour</option>
                                  </FormControl>
                                </FormGroup>
                                <Button onClick={this.handleSubmitName}>Visualiser</Button>
                            </form>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Inputs;
