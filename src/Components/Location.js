import { useEffect, useState } from "react";
import axios from "axios";

function Location() {
  const [currLocation, setCurrLocation] = useState({});
  const [currLocationJs, setCurrLocationJs] = useState({});
  useEffect(() => {
    getLocation();
    getLocationJs();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };

  return (
    <div>
      <h1>Current Location</h1>
      <p>Latitude: {currLocation.latitude}</p>
      <p>Longitude: {currLocation.longitude}</p>
      <p>Lokasi: {currLocation.city}</p>

      <h1>Current Location JS</h1>
      <p>Latitude: {currLocationJs.latitude}</p>
      <p>Longitude: {currLocationJs.longitude}</p>
    </div>
  );
}

export default Location;