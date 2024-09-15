import Rooms from "../data/room_schedules.json";

export const getRoomsByFloorNumber = (floorNumber) => {
  if (!floorNumber) return [];
  return Rooms.filter((room) => room.floor === floorNumber);
};

export const getRoomById = (id) => {
  if (!id) return null;
  return Rooms.find((room) => room.roomID === id);
};
