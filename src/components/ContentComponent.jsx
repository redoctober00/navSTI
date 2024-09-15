import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  GeoJSON,
  Polygon,
  Polyline,
} from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { EditControl } from "react-leaflet-draw";
import { Button, Radio, Space } from "antd";
import Search from "antd/es/input/Search";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import floor1Coordinates from "../data/coordinates/floor1.json";
import floor1_5Coordinates from "../data/coordinates/floor1_5.json";
import floor2Coordinates from "../data/coordinates/floor2.json";
import floor3Coordinates from "../data/coordinates/floor3.json";
import floor4Coordinates from "../data/coordinates/floor4.json";
import DrawerComponent from "./DrawerComponent";
import MapClickHandler from "./MapClickHandler";

const ResetZoom = ({ currentFloor }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([0, 0], 2.2);
  }, [currentFloor, map]);

  return null;
};

const ContentComponent = ({
  colorBgContainer,
  borderRadiusLG,
  showDrawer,
  currentFloor,
  setCurrentFloor,
}) => {
  const [roomId, setRoomId] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const [directions, setDirections] = useState({});
  const [searchedRoom, setSearchedRoom] = useState(null);

  useEffect(() => {
    const directionsMap = {};
    floor1Coordinates.features.forEach((feature) => {
      const roomId = feature.properties.roomId;
      const direction = feature.properties.direction;
      directionsMap[roomId] = direction;
    });
    setDirections(directionsMap);
  }, []);

  const handleSearch = (value) => {
    setSearchedRoom(value);
  };

  const onClose = () => {
    setRoomId(null);
  };

  const onMarkerClick = () => {
    showDrawer();
  };

  const onRoomClick = (e) => {
    const roomId = e.sourceTarget.feature?.properties?.roomId;
    if (!roomId) return;
    setRoomId(roomId);
  };

  //------------Each room---------------
  const onEachFeature = (feature, layer) => {
    layer.setStyle({ weight: 0, fillOpacity: 0 });

    layer.on({
      click: () => {
        layer.setStyle({ fillOpacity: 0.3, weight: 5 });
      },
      mouseover: () => {
        layer.setStyle({ fillOpacity: 0.1, weight: 5 });
      },
      mouseout: () => {
        layer.setStyle({ fillOpacity: 0, weight: 0 });
      },
    });

    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "feature-tooltip",
    });
  };

  //--------Leaflet draw methods-------
  const _onCreate = (e) => {
    console.log(e);
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const coordinates = layer.getLatLngs();
      console.log("Polygon Coordinates:", coordinates);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
  };

  const _onDeleted = (e) => {
    console.log(e);
  };
  //------------------------------------

  const floorLevels = [1, 1.5, 2, 3, 4];

  const floorMaps = [
    {
      floorLevel: 1,
      path: "../assets/maps/floor1-tiles/{z}/{x}/{y}.jpg",
      features: floor1Coordinates,
      directions: directions[searchedRoom],
      markers: [
        {
          label: "Fire Extinguisher",
          position: [-58, 90],
        },
      ],
    },
    {
      floorLevel: 1.5,
      path: "../assets/maps/floor1_5-tiles/{z}/{x}/{y}.jpg",
      features: floor1_5Coordinates,
    },
    {
      floorLevel: 2,
      path: "../assets/maps/floor2-tiles/{z}/{x}/{y}.jpg",
      features: floor2Coordinates,
    },
    {
      floorLevel: 3,
      path: "../assets/maps/floor3-tiles/{z}/{x}/{y}.jpg",
      features: floor3Coordinates,
    },
    {
      floorLevel: 4,
      path: "../assets/maps/floor4-tiles/{z}/{x}/{y}.jpg",
      features: floor4Coordinates,
    },
  ];

  return (
    <div
      className="content-container"
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <MapContainer
        id="map"
        zoomSnap={0}
        zoomDelta={0.5}
        center={[0, 0]}
        zoom={2.2}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <MapClickHandler setCoordinates={setCoordinates}></MapClickHandler>
        <Search
          className="top-3 left-14 relative z-[500]"
          placeholder="Search map"
          style={{ width: "200px" }}
          onSearch={handleSearch}
        ></Search>
        <ResetZoom currentFloor={currentFloor}></ResetZoom>
        {/* <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup> */}
        {floorMaps.map((map, index) => {
          if (map.floorLevel !== currentFloor) return null;
          return (
            <div key={index}>
              <TileLayer
                key={"tile-layer" + index}
                minZoom="2"
                maxZoom="3"
                noWrap="false"
                url={map.path}
              />
              {searchedRoom && map.directions && (
                <Polyline
                  positions={map?.directions}
                  color="#4281a4"
                  pathOptions={{ weight: 10 }}
                />
              )}
              <GeoJSON
                style={{ color: "#4281a4" }}
                key={"geojson" + index}
                eventHandlers={{ click: onRoomClick }}
                data={map.features}
                onEachFeature={onEachFeature}
              ></GeoJSON>

              {map?.markers?.map((marker, index) => (
                <Marker
                  key={"marker" + index}
                  id={roomId}
                  position={marker.position}
                  eventHandlers={{ click: onMarkerClick }}
                >
                  <Tooltip direction="top">
                    <h2 className="text-base p-2">{marker.label}</h2>
                  </Tooltip>
                </Marker>
              ))}
            </div>
          );
        })}

        {/* Floor Level Buttons */}
        <div className="z-[400] absolute bottom-4 left-2 flex flex-col gap-1">
          <Space.Compact direction="vertical">
            {floorLevels.map((floorNumber) => (
              <Button
                size="large"
                key={floorNumber}
                type={currentFloor === floorNumber ? "primary" : "default"}
                onClick={() => {
                  setCurrentFloor(floorNumber);
                }}
                icon={
                  <div
                    className={
                      currentFloor === floorNumber
                        ? "font-semibold text-sm"
                        : "text-sm"
                    }
                  >
                    {floorNumber}F
                  </div>
                }
              ></Button>
            ))}
          </Space.Compact>
        </div>
      </MapContainer>

      <DrawerComponent
        onClose={onClose}
        roomId={roomId}
      />
    </div>
  );
};

export default ContentComponent;
