import React, { useState, useEffect } from "react";
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
  const [currentVaccinationData, setVaccinationData] = useState();
  var selectedCountry;

  async function handleCountrySelectedCallback (country, isSelected) {
    selectedCountry = country;

    if (selectedCountry === undefined || isSelected === false) {
      setCountryData([])

    } else {

      var countryData = currentVaccinationData.filter((rawData) => selectedCountry
        .toLowerCase()
        .replace(/ /g, "")
        .includes(rawData.data[Constants.COUNTRY_NAME_COLUMN_INDEX].toLowerCase().replace(/ /g, ""))).map(it => it.data);

      setCountryData(countryData)
    }
  }


  async function handleCountryDataCallback (data) {
    setVaccinationData(data)
  }

  const updateDate = (date)=> {
    setStartDate(date);
    setCountryData([]);
  };

  return (
    <div className="App p-3">
      <div className="appContent">
        <WorldMap parentSelectedCountryCallback={handleCountrySelectedCallback} currentDate={currentDate} currentVaccinationData={currentVaccinationData}></WorldMap>
        <VaccinationData parentCountryDataCallback={handleCountryDataCallback}></VaccinationData>
        <div className="row justify-content-center">
          <h1 className="col-6 mt-5"> Pick a date</h1>
          <DatePicker selected={currentDate} onChange={(date) => updateDate(date)} className="date-picker col-6 mt-5" />
        </div>
        <DailyInformations countryData={currentCountryData} currentDate={currentDate}> </DailyInformations>
        <Chart countryData={currentCountryData}> </Chart>
      </div>
    </div>
  );
}

export default App;
