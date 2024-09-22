"use client";

import React, { useEffect } from "react";

export const MapsContainer = () => {
  useEffect(() => {
    // Dynamically load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    // Define the map and add the zoom-in animation to Palo Alto
    (window as any).initMap = function () {
      const paloAlto = { lat: 37.4419, lng: -122.143 }; // Palo Alto coordinates
      const hialeah = { lat: 25.8576, lng: -80.2781 }; // Hialeah coordinates
      const opaLocka = { lat: 25.9023, lng: -80.2503 }; // Opa-locka coordinates

      let zoomLevel = 12; // Initial zoom level
      const targetZoom = 12; // Target zoom level

      // @ts-ignore
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: hialeah, // Start at Palo Alto
          zoom: zoomLevel, // Start with a far zoom level
        }
      );

      // Function to place a marker after zoom completes
      const placeMarker = () => {
        // const marker = new google.maps.Marker({
        //   position: paloAlto, // Marker at Palo Alto
        //   map: map,
        //   title: "Palo Alto",
        // });

        // Marker for Hialeah
        // @ts-ignore
        const hialeahMarker = new google.maps.Marker({
          position: hialeah,
          map: map,
          title: "Hialeah",
        });

        // Marker for Opa-locka
        // @ts-ignore
        const opaLockaMarker = new google.maps.Marker({
          position: opaLocka,
          map: map,
          title: "Opa-locka",
        });
      };

      placeMarker();

      // Animate zoom-in effect
      // const zoomIn = () => {
      //   if (zoomLevel < targetZoom) {
      //     zoomLevel += 0.001; // Increment zoom level
      //     map.setZoom(Math.floor(zoomLevel)); // Set zoom on the map
      //     map.setCenter(hialeah); // Keep map centered on Palo Alto
      //     window.requestAnimationFrame(zoomIn); // Request the next frame for smooth animation
      //   } else {
      //     placeMarker(); // Place the marker once zoom is complete
      //   }
      // };

      // Start the zoom-in animation
      // window.requestAnimationFrame(zoomIn);
    };

    return () => {
      document.head.removeChild(script);
      delete (window as any).initMap;
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};
