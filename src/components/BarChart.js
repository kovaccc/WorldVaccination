import React from "react";
import c3 from "c3";
import * as Constants from '../utils/Constants';
import 'c3/c3.css';
import dateFormat from "dateformat";
const BarChart = ({ countryData }) => {

    if (countryData !== undefined) {

        var filteredCountryData = countryData // get only country data where parameters below are relevant 
            .filter(data =>
                data[Constants.TOTAL_VACCINATIONS_INDEX] != "" &&
                data[Constants.TOTAL_VACCINATIONS_INDEX] != undefined &&
                data[Constants.PEOPLE_VACCINATED_INDEX] != "" &&
                data[Constants.PEOPLE_VACCINATED_INDEX] != undefined &&
                data[Constants.PEOPLE_FULLY_VACCINATED_INDEX] != "" &&
                data[Constants.PEOPLE_FULLY_VACCINATED_INDEX] != undefined
            )

        var dates = filteredCountryData.map(countryData => countryData[Constants.DATE_COLUMN_INDEX])

        var totalVaccinations = filteredCountryData
            .map(data => data[Constants.TOTAL_VACCINATIONS_INDEX])

        var peopleVaccinated = filteredCountryData
            .map(data => data[Constants.PEOPLE_VACCINATED_INDEX])

        var peopleFullyVaccinated = filteredCountryData
            .map(data => data[Constants.PEOPLE_FULLY_VACCINATED_INDEX])


        totalVaccinations = ["Total vaccinations"].concat(totalVaccinations)
        peopleVaccinated = ["People vaccinated"].concat(peopleVaccinated)
        peopleFullyVaccinated = ["People fully vaccinated"].concat(peopleFullyVaccinated)
        var datesData = ["x"].concat(dates)
    

    }

    React.useEffect(() => {
        if (countryData !== undefined) {
            var chart = c3.generate({
                size: {
                    height: 600
                },
                bindto: "#chart",
                data: {
                    x: 'x',
                    columns: [
                        datesData,
                        totalVaccinations,
                        peopleVaccinated,
                        peopleFullyVaccinated
                    ],
                    type: "area",
                },
                zoom: {
                    enabled: true
                },
                axis: {
                    x: {
                        label: {
                            text: 'Vaccination days',
                            position: 'outer-center'
                        },
                        type: 'timeseries',
                        tick: {       
                            format: function(x) {return dateFormat(x, "dd/mm/yyyy");},
                            fit: true,          
                            values: dates,
                            rotate: 75,
                            multiline: false
                        },
                        height: 130
                    },
                    y: {
                        label: {
                            text: 'Number of people',
                            position: 'outer-center'
                        },
                        padding: {top: 100, bottom: 100}
                    }
                }
            });
        }

    }, [countryData]);

    return (
        <div className="row" id="chart" />
    );

};

export default BarChart;