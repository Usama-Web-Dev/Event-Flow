import React from "react";
import "./Layout.css";
import { Image } from "antd";
import { useState } from "react";
import { CodeSandboxOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import {
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import AppRouting from "../AppRouting";
import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";




const { Sider, Header, Content, Footer } = Layout;

function getItem(label, key, icon, children, className) {
  return {
    key,
    icon,
    children,
    label,
    className
  };
}
const items = [
  getItem(
    <Link className="link" onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} to="/">
      Dashboard
    </Link>,
    "1",
    <HomeOutlined />,
    "",
    "e2e_left_menu_dashboard"
  ),
 
  getItem("Conference", "2", <CodeSandboxOutlined />, [
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/add">
       {/* <PlusCircleOutlined />, */}
        Add 
      </Link>,
      "3", 
      "",
      "",
      "e2e_left_menu_analysis_show_analysis",   
         
    ),
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/view">
       {/* <PlusCircleOutlined />, */}
        view 
      </Link>,
      "4", 
      "",
      "",
      "e2e_left_menu_analysis",   
         
    )






    // getItem("View", "4", "",
    // // <EyeOutlined />, 
    // [
    //   getItem(
    //     <Link className="link" onClick={() => {
    //       window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }} to="/view">
    //       View Conference 
    //     </Link>,
    //     "13",
    //     "",
    //     "",
    //     // "e2e_left_menu_analysis_show_analysis",      
    //   ),
    //   getItem(
    //     <Link className="link" onClick={() => {
    //       window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }} to="/view-speaker">
    //       View Speaker 
    //     </Link>,
    //     "14",
    //     "",
    //     "",
    //     // "e2e_left_menu_analysis_show_analysis",        
    //   ),
    //   getItem(
    //     <Link className="link" onClick={() => {
    //       window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }} to="/view-venue">
    //       View Venue 
    //     </Link>,
    //     "15",
    //     "",
    //     "",
    //     // "e2e_left_menu_analysis_show_analysis",
    //   ), 
    //  ],
    //  "e2e_left_menu_analysis",  
    // ),
   ],
   "e2e_left_menu_analysis",  
  ),

  getItem("Admin", "6", <UserOutlined/>, [
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/add-admin">
        Add 
      </Link>,
      "7",
      "",
      "",
      "e2e_left_menu_analysis_show_analysis",
      
    ),
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/view-admin">
        View
      </Link>,
      "8",
      "",
      "",
      "e2e_left_menu_analysis_show_analysis",
      
    ),
   
  ],
    
  ),
  getItem("Setting", "9", <SettingOutlined />, [
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/update-profile">
        Update Profile 
      </Link>,
      "10",
      "",
      "",
      "e2e_left_menu_analysis_show_analysis",
      
    ),
    getItem(
      <Link className="link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} to="/update-password">
        Update Password
      </Link>,
      "11",
      "",
      "",
      "e2e_left_menu_analysis_show_analysis",
      
    ),
   
  ],
    
  ),
  
];








function ThemeLayout() {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible = {true}
        breakpoint= {"md"}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}

      >
        <div className="text-center mt-2">
          <Link to="/"> <Image preview={false} className="admin-logo  mb-1" src="/images/admin-image-1.png" style={{ cursor: "pointer" }} /> </Link>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            widows: "100%",
            backgroundColor: colorBgContainer,
            zIndex: 1,
           
            
          }}
          // className="shadow"
        >
          <TopHeader />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 10,
              minHeight: 360,
            }}
          >
            <AppRouting />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <hr />
          Conference Scheduler  ©2023 Created By TechHatch
        </Footer>
      </Layout>
    </Layout>
  );
}
export default ThemeLayout;
