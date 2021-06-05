import React, { Component, useRef, useEffect, useState } from "react";
import "./App.css";
import Map from './components/Map';
import VaccinationData from './components/VaccinationData'


function App() {

  var countryData = [];

  const handleCountrySelectedCallback = (country) => {
    console.log("country is", country)
  }

  const handleCountryDataCallback = (data) => {
    countryData = data;
    console.log("country is", countryData[0].data); // access first element in first row 
  }


  return (
    <div className="App">
      <div className="content">
        <Map parentSelectedCountryCallback={handleCountrySelectedCallback}></Map>
        <VaccinationData parentCountryDataCallback={handleCountryDataCallback}></VaccinationData>
        <div id="chart"></div>
      </div>
    </div>
  );
}

export default App;
