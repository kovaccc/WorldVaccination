import dateFormat from "dateformat";
import * as Constants from '../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
const DailyInformations = ({ countryData, currentDate }) => {

    var formatedDate = dateFormat(currentDate, "yyyy-mm-dd");

    var filteredCountryData = new Array(15).fill(" ");

    if (countryData === undefined || countryData.length === 0) {
        filteredCountryData = new Array(15).fill(" ")
    }
    else {
        filteredCountryData = countryData.find((data) => data[Constants.DATE_COLUMN_INDEX] === formatedDate) // find first that matches date 
        if (filteredCountryData === undefined || filteredCountryData.length === 0) {
            filteredCountryData = new Array(15).fill("")
        }
    }

    function noDataAavailableString() {
        return Constants.NO_DATA_AVAILABLE + formatedDate
    }

    return (
        <div className="row mt-5 countryDailyInformations">
            <h2 className="col-5 ml-3 mb-4">Daily information</h2>
            <div className="col-12 daily-informations-preview">
                <p> <b> {Constants.COUNTRY_NAME_COLUMN}</b> {filteredCountryData[Constants.COUNTRY_NAME_COLUMN_INDEX] ? filteredCountryData[Constants.COUNTRY_NAME_COLUMN_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.ISO_CODE_COLUMN}</b> {filteredCountryData[Constants.ISO_CODE_COLUMN_INDEX] ? filteredCountryData[Constants.ISO_CODE_COLUMN_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.DATE_COLUMN}</b> {filteredCountryData[Constants.DATE_COLUMN_INDEX] ? filteredCountryData[Constants.DATE_COLUMN_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.TOTAL_VACCINATIONS}</b> {filteredCountryData[Constants.TOTAL_VACCINATIONS_INDEX] ? filteredCountryData[Constants.TOTAL_VACCINATIONS_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.PEOPLE_VACCINATED}</b> {filteredCountryData[Constants.PEOPLE_VACCINATED_INDEX] ? filteredCountryData[Constants.PEOPLE_VACCINATED_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.PEOPLE_FULLY_VACCINATED}</b> {filteredCountryData[Constants.PEOPLE_FULLY_VACCINATED_INDEX] ? filteredCountryData[Constants.PEOPLE_FULLY_VACCINATED_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.DAILY_VACCINATIONS_RAW}</b> {filteredCountryData[Constants.DAILY_VACCINATIONS_RAW_INDEX] ? filteredCountryData[Constants.DAILY_VACCINATIONS_RAW_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.DAILY_VACCINATIONS}</b> {filteredCountryData[Constants.DAILY_VACCINATIONS_INDEX] ? filteredCountryData[Constants.DAILY_VACCINATIONS_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.TOTAL_VACCIONATIONS_PER_HUNDRED}</b> {filteredCountryData[Constants.TOTAL_VACCIONATIONS_PER_HUNDRED_INDEX] ? filteredCountryData[Constants.TOTAL_VACCIONATIONS_PER_HUNDRED_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.PEOPLE_VACCINATED_PER_HUNDRED}</b> {filteredCountryData[Constants.PEOPLE_VACCINATED_PER_HUNDRED_INDEX] ? filteredCountryData[Constants.PEOPLE_VACCINATED_PER_HUNDRED_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.PEOPLE_FULLY_VACCINATED_PER_HUNDRED}</b> {filteredCountryData[Constants.PEOPLE_FULLY_VACCINATED_PER_HUNDRED_INDEX] ? filteredCountryData[Constants.PEOPLE_FULLY_VACCINATED_PER_HUNDRED_INDEX]  : noDataAavailableString()} </p>
                <p> <b> {Constants.DAILY_VACCINATIONS_PER_MILLION}</b> {filteredCountryData[Constants.DAILY_VACCINATIONS_PER_MILLION_INDEX] ? filteredCountryData[Constants.DAILY_VACCINATIONS_PER_MILLION_INDEX]  : noDataAavailableString()} </p>
                <p> <b> {Constants.VACCINES}</b> {filteredCountryData[Constants.VACCINES_INDEX] ? filteredCountryData[Constants.VACCINES_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.SOURCE_NAME}</b> {filteredCountryData[Constants.SOURCE_NAME_INDEX] ? filteredCountryData[Constants.SOURCE_NAME_INDEX] : noDataAavailableString()} </p>
                <p> <b> {Constants.SOURCE_WEBSITE}</b> {filteredCountryData[Constants.SOURCE_WEBSITE_INDEX] ? filteredCountryData[Constants.SOURCE_WEBSITE_INDEX] : noDataAavailableString()} </p>
            </div>
        </div>
    );
}

export default DailyInformations;