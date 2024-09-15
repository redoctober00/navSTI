import React, { useState } from "react";
import { Button, Card, Divider, Menu, theme } from "antd";
import { StarFilled, HomeFilled } from "@ant-design/icons";
import DrawerComponent from "./DrawerComponent";

const roomsByFloor = [
  {
    key: "1",
    icon: React.createElement(StarFilled),
    label: "Rooms",
    rooms: [
      { key: "lab-a", label: "Laboratory A" },
      { key: "admissions", label: "Admissions Office" },
      { key: "registrar", label: "Registrar" },
      { key: "cashier", label: "Cashier" },
      { key: "proware", label: "Purchasing Office" },
      { key: "guidance", label: "Guidance" },
      { key: "discipline", label: "Discipline Office" },
      { key: "sao", label: "Student Affairs Office" },
    ],
  },
  {
    key: "1.5",
    icon: React.createElement(StarFilled),
    label: "Rooms",
    rooms: [
      { key: "library", label: "Library" },
      { key: "communication", label: "Communication" },
      { key: "deputy", label: "Deputy School Admin" },
    ],
  },
  {
    key: "2",
    icon: React.createElement(StarFilled),
    label: "Rooms",
    rooms: [
      { key: "201", label: "A201 Classroom" },
      { key: "202", label: "A202 Classroom" },
      { key: "203", label: "A203 Classroom" },
      { key: "204", label: "A204 Classroom" },
      { key: "205", label: "A205 Classroom" },
      { key: "206", label: "A206 Classroom" },
    ],
  },
  {
    key: "3",
    icon: React.createElement(StarFilled),
    label: "Rooms",
    rooms: [
      { key: "301", label: "Computer Lab B" },
      { key: "302", label: "Computer Lab C" },
      { key: "303", label: "Computer Lab D" },
      { key: "304", label: "Computer Lab E" },
      { key: "305", label: "Computer Lab F" },
    ],
  },

  {
    key: "4",
    icon: React.createElement(StarFilled),
    label: "Rooms",
    rooms: [
      { key: "401", label: "A401 Classroom" },
      { key: "402", label: "A402 Classroom" },
      { key: "403", label: "A403 Classroom" },
      { key: "404", label: "A404 Electronics Lab" },
      { key: "405", label: "A405 Physics Lab" },
      { key: "406", label: "A406 Chemistry Lab" },
    ],
  },
];

const SiderComponent = ({ currentFloor }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [roomId, setRoomId] = useState(null);

  const onClose = () => {
    setRoomId(null);
  };

  const handleClick = (e) => {
    setRoomId(e.key);
  };

  const filteredRooms = roomsByFloor.find(
    (floor) => floor?.key == currentFloor
  );

  return (
    <>
      <div>
        <a
          href=""
          className=""
        >
          <img
            className="p-2"
            src="logo.svg"
            alt=""
          />
          <h2></h2>
        </a>

        <Divider orientation="left">Points of interest</Divider>
        <div className="h-full border-r-0">
          <Menu
            mode="inline"
            style={
              {
                // background: colorBgContainer,
              }
            }
            items={filteredRooms.rooms}
            onClick={handleClick}
          />
        </div>

        <Divider
          className="text-white"
          orientation="left"
        >
          Others
        </Divider>
      </div>

      <DrawerComponent
        onClose={onClose}
        roomId={roomId}
      />
    </>
  );
};

export default SiderComponent;
