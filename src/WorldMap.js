import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

function WorldMap() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    let map = am4core.create("chartdiv", am4maps.MapChart);

    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();

    map.background.fill = am4core.color("#87CEEB");
    map.background.fillOpacity = 1;

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.slider.height = 300;

    polygonTemplate.events.on("hit", function (ev) {
      const clickedPolygon = ev.target;
      const countryName = clickedPolygon.dataItem.dataContext.name;

      map.zoomToMapObject(clickedPolygon, 5, true);
      clickedPolygon.fill = am4core.color("#ffffff");

      setTimeout(() => {
        // 쿼리 파라미터를 포함한 라우팅
        const nation = countryName.replace(" ", "").toLowerCase(); // 공백 제거, 소문자 변환
        navigate(`/main?nation=${nation}`);
      }, 1500);
    });

    return () => {
      map.dispose();
    };
  }, [navigate]);

  return (
    <div
      id="chartdiv"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

export default WorldMap;
