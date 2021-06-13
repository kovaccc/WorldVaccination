import React, { Component, useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import * as d3 from "d3";
import * as topojson from "topojson";
import dateFormat from "dateformat";
import * as Constants from '../utils/Constants';

const Map = ({ parentSelectedCountryCallback, currentDate, currentVaccinationData }) => {

    const svgRef = useRef();
    const tooltipRef = useRef();
    var countryNames = [];
    var countriesForDateData;

    const width = 1000;
    const height = 900;
    var centered;

    var projection = d3.geoMercator().scale(150)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath(projection);

    var opacityCountries = d3.scaleLinear().domain([0, 100]).range([0.55, 1])

    var formatedDate = dateFormat(currentDate, "yyyy-mm-dd");


    function getCountryOpacity(d) {

        if (countriesForDateData === undefined || countriesForDateData.length == 0 || d === undefined) {

        } else {

            let value = countriesForDateData.filter(country =>
                d.toLowerCase()
                    .replace(/ /g, "")
                    .includes(country.data[Constants.COUNTRY_NAME_COLUMN_INDEX].toLowerCase().replace(/ /g, ""))).map(it => it.data); // country data 

            if (value === undefined || value.length == 0 || value == false) {

            } else {
                let finalArrayData = value[0] // get first or only element that are matching name 
                let opacityValue = Math.round(finalArrayData[Constants.TOTAL_VACCIONATIONS_PER_HUNDRED_INDEX])

                if (opacityValue === 0 || opacityValue === undefined) { } else { return opacityCountries(opacityValue) }
            }
        }

        return 0.2; // if no data presented for total vaccinations 
    }

    function clicked(d) {
        var x, y, k;

        var svg = select(svgRef.current);
        const g = svg.select('#mapGroup');

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }


        g.selectAll("path")
            .classed("active", centered && function (d) { return d === centered; })
            .call(function (e) {
                if (centered && function (d) { return d === centered; })
                    parentSelectedCountryCallback(countryNames[d.id], true);
                else {
                    parentSelectedCountryCallback(countryNames[d.id], false);
                }
            });

        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");


    }

    useEffect(() => {

        d3.selectAll("svg > *").remove(); // clear svg to draw new one 


        if (currentVaccinationData !== undefined) {
            countriesForDateData = currentVaccinationData.filter((rawData) =>
                formatedDate == rawData.data[Constants.DATE_COLUMN_INDEX]);
        } // get data of all countries for current selected date


        var svg = select(svgRef.current);
        var tooltip = select(tooltipRef.current);

        svg.append("rect")
            .attr("id", "mapBackground")
            .attr("width", width)
            .attr("height", height)
            .on("click", clicked);

        var g = svg.append('g').attr("id", "mapGroup");


        Promise.all([
            d3.json("https://cdn.rawgit.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json"),
            d3.tsv("https://cdn.rawgit.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-country-names.tsv"),
        ]).then(([world, names]) => {

            var countries = topojson.feature(world, world.objects.countries).features;

            //map country names to IDs used on map
            names.forEach(function (i) {
                countryNames[i.id] = i.name;
            });


            g.append("g")
                .attr("class", "country")
                .selectAll(".country")
                .data(countries)
                .enter().append('path')
                .attr("d", path)
                .attr("id", function (d) { return d.id; })
                .style("opacity", function (d) { return getCountryOpacity(countryNames[d.id]) })
                .on('click', function (e, d) {
                    clicked(d);
                }).on("mouseover", function (e, d) {
                    d3.select(this).attr("fill", "grey").attr("stroke-width", 2)
                    return tooltip.classed("hidden", false).html(countryNames[d.id]);
                })
                .on("mousemove", function (e, d) {
                    tooltip.classed("hidden", false)
                        .style("top", (e.y) + "px")
                        .style("left", (e.x + 10) + "px")
                        .html(countryNames[d.id]);
                })
                .on("mouseout", function (e, d) {
                    d3.select(this).attr("fill", "red").attr("stroke-width", 1)
                    tooltip.classed("hidden", true);
                });

            g.append("path")
                .datum(topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }))
                .attr("id", "country-borders")
                .attr("d", path);


        }).catch(err => console.log('Error loading or parsing data.'))

    }, [currentDate, currentVaccinationData]);

    return (
        <div className="mapContainer">
            <svg ref={svgRef} width={width} height={height} className="worldMap"> </svg>
            <div ref={tooltipRef} className="mapTooltip"></div>
        </div>

    );
}

export default Map;