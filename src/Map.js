import React, { Component,useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import * as d3 from "d3";
import * as topojson from "topojson";
import { feature } from 'topojson';

const Map = () => {

    const svgRef = useRef();


    const width = 900;
    const height = 600;

    useEffect(() => {
        const svg = select(svgRef.current);

        const projection = d3.geoMercator().scale(140)
            .translate([width / 2, height / 1.4]);
        const path = d3.geoPath(projection);

        const g = svg.append('g');

        d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
        .then(data => {
            console.log("data is" + data.objects.countries.type)
            const countries = feature(data, data.objects.countries);
            g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);
        });
    });

    return (
    <svg ref={svgRef} width="1000px" height="1000px" className="worldMap"></svg> 
    );
}

export default Map;