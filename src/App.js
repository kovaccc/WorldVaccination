import React, { Component, useRef, useEffect, useState } from "react";
import "./App.css";
import Map from './components/Map';
import VaccinationData from './components/VaccinationData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Constants from './utils/Constants';


function App() {

  const [currentCountry, setCurrentCountry] = useState();
  const [currentDate, setStartDate] = useState(new Date());
  var vaccinationData = []

  const handleCountrySelectedCallback = (country) => {
    console.log("country is", country)
    setCurrentCountry(country)

    // todo check if country is undefined then dont draw barchart 

  }

  const handleCountryDataCallback = (data) => {
    vaccinationData = data;
    console.log("data is ", vaccinationData[0].data[0]); // access first element in first row 
  }


  return (
    <div className="App">
      <div className="content">
        <Map parentSelectedCountryCallback={handleCountrySelectedCallback}></Map>
        <VaccinationData parentCountryDataCallback={handleCountryDataCallback}></VaccinationData>
        <DatePicker selected={currentDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div id="chart"></div>
    </div>
  );
}

export default App;
