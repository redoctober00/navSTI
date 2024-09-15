import React, { useState } from "react";
import { Button, Card, Divider, Layout, Popover, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SiderComponent from "../components/SiderComponent";
import ContentComponent from "../components/ContentComponent";
import Search from "antd/es/input/Search";

const { Header, Content, Sider } = Layout;

const Map = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Layout>
          <Popover
            trigger="click"
            placement="bottomRight"
            content={
              <div className="left-2 flex flex-col items-center">
                <span className="mb-2">email@school.edu.ph</span>
                <Button
                  className="w-full"
                  // type="primary"
                  danger
                >
                  Log out
                </Button>
              </div>
            }
          >
            <Button
              className="m-2 absolute z-[1000] top-2 right-2"
              icon={<UserOutlined />}
              shape="circle"
              size="large"
              type="primary"
            ></Button>
          </Popover>

          <Sider
            className="z-[401]"
            theme="light"
            // collapsible
            // collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="lg"
            collapsedWidth="0"
            width={220}
          >
            <SiderComponent currentFloor={currentFloor} />
          </Sider>
          <Layout className="h-screen p-2">
            <Content>
              <ContentComponent
                colorBgContainer={colorBgContainer}
                borderRadiusLG={borderRadiusLG}
                currentFloor={currentFloor}
                setCurrentFloor={setCurrentFloor}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Map;
