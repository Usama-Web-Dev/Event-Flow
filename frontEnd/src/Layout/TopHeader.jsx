import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Row, Col, Button } from "antd";
import "./Layout.css";





function TopHeader() {
  const token = localStorage.getItem('user-token')
  const navigate = useNavigate();
  
function getItem(label, key, icon, children, type, className)
{
  return {
    
    key,
    icon,
    children,
    label,
    type,
    className,
  };
}
const items = [

  
  getItem(
    "",
    "sub1",
    <img
     
      src='/images/admin-image-1.png'
      alt="logo not found"
      style={{ width: "40px", height: "40px", paddingLeft: "0px !impotant" }}
    />,

    [
      getItem(
        <Link className="link" to="/update-profile">
          Profile
        </Link>,
        "1",
        "",
        "",
        "",
        "top-header-submenu"
      ),
      getItem(
          <Button className="e2e_logout_button" onClick={async () => {
           
            navigate("/Login")
           
            }}> Logout</Button>,
        
        "3",
        "",
        "",
        "",
        "top-header-submenu "
      ),
    ],
    "",
    "top-header-menu e2e_header_menu"
  ),
];
  return (
    <Row style={{ float: "right" }} className="e2e_logout_div">
      <Col style={{ marginTop: "12px", marginRight: "20px" }}>
        <Menu
        className="e2e_menu"
          mode="inline"
          style={{
            width: 80,
            borderInlineEnd: "none",
          }}
          items={items}
        />
      </Col>
    </Row>
  );
}

export default TopHeader;
