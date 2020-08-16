import React, { useState, useEffect, useCallback } from "react";
import "./Main.css";
import Location from "../Location";
import LocalDate from "../Localdate";
import SunTimes from "../SunTimes";
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import MapLeaflet from "../Map";

export const Main = () => {
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  // const [userLocation, setUserLocation] = useState("UNKNOWN")
  const [localDate, setLocalDate] = useState([0, 0, 0]);
  const [localTime, setLocalTime] = useState([0, 0, 0]);
  const [sunrise, setSunrise] = useState("-calculating-");
  const [sunset, setSunset] = useState("-calculating-");

  const getUserPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
        console.log(position);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  const getDateTime = useCallback(() => {
    let today = new Date();
    setLocalDate([today.getDate(), today.getMonth(), today.getFullYear()]);
    setLocalTime([today.getHours(), today.getMinutes(), today.getSeconds()]);
  }, [])

  const getSunTimes = useCallback(() => {
    let sunRise = String(getSunrise(userLatitude, userLongitude)).split(" ");
    let sunSet = String(getSunset(userLatitude, userLongitude)).split(" ");

    setSunrise(sunRise[4]);
    setSunset(sunSet[4]);
  }, [userLatitude, userLongitude])


  useEffect(() => {
    getUserPosition();
    getDateTime();
    getSunTimes();
  }, [getUserPosition, getDateTime, getSunTimes]);


  return (
    <div className="main">
      <div className="infopanel">
        <Location className={"infoitem"} userLocation={`${userLatitude}, ${userLongitude}`} ></Location>
        <LocalDate className={"infoitem"} localDate={localDate} localTime={localTime} ></LocalDate>
        <SunTimes className={"infoitem"} sunrise={sunrise} sunset={sunset} ></SunTimes>
      </div>
      <MapLeaflet className={"leaflet-container"} userLatitude={userLatitude} userLongitude={userLongitude}></MapLeaflet>
    </div>
  );
};

export default Main;
