import React, { useState } from "react";
import "./App.css";
import WorldMap from './components/WorldMap';
import VaccinationData from './components/VaccinationData'
import DailyInformations from './components/DailyInformations'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Constants from './utils/Constants';
import Chart from "./components/Chart";


function App() {

  const [currentDate, setStartDate] = useState(new Date());
  const [currentCountryData, setCountryData] = useState();
  var selectedCountry;
  var vaccinationData = []

  const handleCountrySelectedCallback = (country, isSelected) => {
    selectedCountry = country;

    if (selectedCountry === undefined || isSelected === false) {
      setCountryData([])

    } else {

      var countryData = vaccinationData.filter((rawData) => selectedCountry
        .toLowerCase()
        .replace(/ /g, "")
        .includes(rawData.data[Constants.COUNTRY_NAME_COLUMN_INDEX].toLowerCase().replace(/ /g, ""))).map(it => it.data);

      setCountryData(countryData)
    }
  }

  const handleCountryDataCallback = (data) => {
    vaccinationData = data;
  }


  return (
    <div className="App p-3">
      <div className="appContent">
        <WorldMap parentSelectedCountryCallback={handleCountrySelectedCallback}></WorldMap>
        <VaccinationData parentCountryDataCallback={handleCountryDataCallback}></VaccinationData>
        <div className="row justify-content-center">
          <h1 className="col-4 mt-5"> Pick a date</h1>
          <DatePicker selected={currentDate} onChange={(date) => setStartDate(date)} className="date-picker col-8 mt-5" />
        </div>
        <DailyInformations countryData={currentCountryData} currentDate={currentDate}> </DailyInformations>
        <Chart countryData={currentCountryData}> </Chart>
      </div>
    </div>
  );
}

export default App;
