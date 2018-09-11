"use strict";

require("mocha");

let chai = require("chai");
let should = chai.should();
chai.use(require("chai-as-promised"));
chai.use(require("chai-http"));

let handler = require("./handler");

const API_URL = "https://u7nhp75j86.execute-api.us-east-1.amazonaws.com/dev";


describe("Test back-end", () => {
  describe("Get city center with name", () => {
    it("should have 201 code with the correct name and returned results", (done) => {
      chai.request(API_URL)
      .post("/city/centre")
      .set('content-type', 'application/json')
      .send({ name: 'Amiens' })
      .end((err, res) => {
        let res_json = JSON.parse(res.text);
        res.should.have.status(201);
        res_json["features"][0]["properties"]["nom"].should.be.equal("Amiens");
        done();
      });
    });

    it("should have 201 code with a non existing name and return no results", (done) => {
      chai.request(API_URL)
      .post("/city/centre")
      .set('content-type', 'application/json')
      .send({ name: 'Amienszzzzzzzz' })
      .end((err, res) => {
        let res_json = JSON.parse(res.text);
        res.should.have.status(201);
        res_json["features"].length.should.be.equal(0);
        done();
      });
    });
  });

  describe("Get city center with lat/lon", () => {
      it("should have 201 code with the correct lat/lon and returned results", (done) => {
        chai.request(API_URL)
        .post("/city/centre")
        .send({ lat: '49.895', lon: '2.3022' })
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(201);
            res_json["features"][0]["properties"]["nom"].should.be.equal("Amiens");
            done();
        });
      });

      it("should have 201 code with a lat/lon not in France and return no results", (done) => {
        chai.request(API_URL)
        .post("/city/centre")
        .send({ lat: '9.895', lon: '2.3022' })
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(201);
            res_json["features"].length.should.be.equal(0);
            done();
        });
      });
  });

  describe("Get city center errors", () => {
      it("should have 500 status code when no inputs provided", (done) => {
        chai.request(API_URL)
        .post("/city/centre")
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(502);
            res_json.message.should.be.equal("Internal server error");
            done();
        });
      });
  });

  describe("Get city area with name", () => {
    it("should have 201 code with the correct name and returned results", (done) => {
      chai.request(API_URL)
      .post("/city/area")
      .send({ name: 'Amiens' })
      .end((err, res) => {
          let res_json = JSON.parse(res.text);
          res.should.have.status(201);
          res_json["features"][0]["properties"]["nom"].should.be.equal("Amiens");
          done();
      });
    });

    it("should have 201 code with a non existing name and return no results", (done) => {
      chai.request(API_URL)
      .post("/city/area")
      .send({ name: 'Amienszzzzzzzz' })
      .end((err, res) => {
          let res_json = JSON.parse(res.text);
          res.should.have.status(201);
          res_json["features"].length.should.be.equal(0);
          done();
      });
    });
  });

  describe("Get city area with lat/lon", () => {
      it("should have 201 code with the correct lat/lon and returned results", (done) => {
        chai.request(API_URL)
        .post("/city/area")
        .send({ lat: '49.895', lon: '2.3022' })
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(201);
            res_json["features"][0]["properties"]["nom"].should.be.equal("Amiens");
            done();
        });
      });

      it("should have 201 code with a lat/lon not in France and return no results", (done) => {
        chai.request(API_URL)
        .post("/city/area")
        .send({ lat: '9.895', lon: '2.3022' })
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(201);
            res_json["features"].length.should.be.equal(0);
            done();
        });
      });
  });

  describe("Get city area errors", () => {
      it("should have 500 status code when no inputs provided", (done) => {
        chai.request(API_URL)
        .post("/city/centre")
        .end((err, res) => {
            let res_json = JSON.parse(res.text);
            res.should.have.status(502);
            res_json.message.should.be.equal("Internal server error");
            done();
        });
      });
  });

  describe("Build url function", () => {
      it("should correctly build the url with name and center", (done) => {
          let url = handler.buildUrl({ name: "Amiens" }, "centre");
          url.should.be.equal("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=centre&nom=Amiens");
          done();
      });

      it("should correctly build the url with lat/lon and center", (done) => {
          let url = handler.buildUrl({ lat: "49", lon: "2" }, "centre");
          url.should.be.equal("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=centre&lat=49&lon=2");
          done();
      });

      it("should correctly build the url with name and area", (done) => {
          let url = handler.buildUrl({ name: "Amiens" }, "contour");
          url.should.be.equal("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=contour&nom=Amiens");
          done();
      });

      it("should correctly build the url with lat/lon and area", (done) => {
          let url = handler.buildUrl({ lat: "49", lon: "2" }, "contour");
          url.should.be.equal("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=contour&lat=49&lon=2");
          done();
      });

      it("should correctly build the url with lat/lon, name and centre", (done) => {
          let url = handler.buildUrl({ name: "Amiens", lat: "49", lon: "2" }, "centre");
          url.should.be.equal("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=centre&nom=Amiens");
          done();
      });
  })
});
