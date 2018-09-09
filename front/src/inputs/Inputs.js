import React, { Component } from 'react';
import './Inputs.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

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

class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            lat: "",
            lon: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
        let uriReq = "https://p4rc7y2o01.execute-api.us-east-1.amazonaws.com/dev/city/area";
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
                lon: ""
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id="inputs">
                <form>
                    <FieldGroup
                      id="formLat"
                      type="text"
                      label="Latitude"
                      placeholder="Enter latitude"
                      value={this.state.lat}
                      name="lat"
                      onChange={this.handleInputChange}
                    />
                    <FieldGroup
                      id="formLon"
                      type="text"
                      label="Longitude"
                      placeholder="Enter longitude"
                      value={this.state.lon}
                      name="lon"
                      onChange={this.handleInputChange}
                    />
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>
        );
    }
}

export default Inputs;
