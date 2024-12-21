'use client';
import { PositionType } from "@/types";
import { useState } from "react";



const useTrackLocation = () => {
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const [longLat, setLongLat] = useState('');
    const [locationErrorMsg, setLocationErrorMsg] = useState('');

    function success(position: PositionType) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLongLat(`${longitude},${latitude}`);

        setIsFindingLocation(false);
        setLocationErrorMsg('');
        console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }
    
    function error() {
        setIsFindingLocation(false);
        setLocationErrorMsg("Unable to retrive your location");
        console.error("Unable to retrive your location");
    }
    
    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            console.log("Geolocation is not supported by your browser");
        } else {
            console.log("Locating...");
            setIsFindingLocation(true);
            setLocationErrorMsg('');
        navigator.geolocation.getCurrentPosition(success, error);
    }

}


    return {
      longLat,
      isFindingLocation,
      handleTrackLocation,
      locationErrorMsg,
    };
}

export default useTrackLocation;