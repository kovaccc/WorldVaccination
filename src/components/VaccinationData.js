import csvFile from '../country_vaccinations.csv'
import { readString } from 'react-papaparse';
import React, { Component, useRef, useEffect, useState } from "react";
import Papa from 'papaparse/papaparse.min';

const VaccinationData = ({parentCountryDataCallback}) => {

    useEffect(() => {

        var vaccinationData = [];

        Papa.parse(csvFile, {
            download: true,
            step: function (row) {
                vaccinationData.push(row)
            },
            complete: function () {
                parentCountryDataCallback(vaccinationData)
            }
        });
    });

    return (
        <div></div>
    );
}

export default VaccinationData;
