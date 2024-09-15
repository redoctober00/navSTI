import React, { useEffect, useMemo, useState } from "react";
import { Button, Drawer, List, Image, Tabs, Card } from "antd";

import dayjs from "dayjs";
import { getRoomById, getRoomsByFloorNumber } from "../service/rooms";

const DrawerComponent = ({ onClose, roomId }) => {
  const room = useMemo(() => {
    return getRoomById(roomId);
  }, [roomId]);

  const days = ["mon", "tue", "wed", "thu", "fri", "sat"];

  const currentDay = dayjs().format("ddd").toLowerCase();

  return (
    <>
      {room?.description || room?.schedules ? (
        <Drawer
          styles={{ body: { padding: 0 } }}
          title={room?.roomName}
          onClose={onClose}
          open={!!roomId}
        >
          <Image
            className="object-cover"
            src={`assets/images/rooms/${roomId}.jpg`}
            height={200}
            width={"100%"}
          ></Image>

          <div className="p-5">
            {room && room.schedules ? (
              <Tabs
                defaultActiveKey={currentDay}
                items={days.map((day) => ({
                  label: day.toUpperCase(),
                  key: day,
                  children: (
                    <List
                      size="small"
                      bordered
                      dataSource={room?.schedules?.[day] ?? []}
                      renderItem={(item) => (
                        <List.Item className="">
                          <b>
                            {item.subject + " ("}
                            {item.time + ")"}
                          </b>
                          <br />
                          {item.section}
                          <br />
                          {item.instructor}
                        </List.Item>
                      )}
                    />
                  ),
                }))}
              />
            ) : (
              <div className="">
                <Card title="Description">
                  {/* {room?.description} */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris id velit sit amet augue volutpat venenatis. In lobortis
                  euismod neque et blandit. Integer dui ante, rhoncus a
                  condimentum non, convallis sed libero. Donec molestie bibendum
                  metus, nec commodo mi consectetur eu. Aenean sed elementum
                  orci. Curabitur aliquet ex ac nulla dapibus, quis rutrum est
                  imperdiet.
                </Card>
              </div>
            )}
          </div>
        </Drawer>
      ) : null}
    </>
  );
};

export default DrawerComponent;
