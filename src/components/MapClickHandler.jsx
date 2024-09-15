import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ setCoordinates }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setCoordinates([lat, lng]);

      console.log(`${lng}, ${lat}`);
    },
  });
  return null;
};

export default MapClickHandler;
