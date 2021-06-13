import csvFile from '../data/country_vaccinations.csv'
import React, { useEffect } from "react";
import Papa from 'papaparse/papaparse.min';

const VaccinationData = ({ parentCountryDataCallback }) => {

    useEffect(() => {

        var vaccinationData = [];

        Papa.parse(csvFile, { // https://www.kaggle.com/gpreda/covid-world-vaccination-progress  
            download: true,
            step: function (row) {
                vaccinationData.push(row)
            },
            complete: function () {
                parentCountryDataCallback(vaccinationData)
            }
        });
    }, []);

    return (
        <div></div>
    );
}

export default VaccinationData;
