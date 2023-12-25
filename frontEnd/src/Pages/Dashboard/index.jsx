import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Image, Statistic, Form } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import "../../Style/Util.css"
import Collapse from "./Collapse";
import Calendar from "./Calendar";
import { getApi } from "../../Services/apiCaller";
import { Notifications } from "../../Components/Notifications";
import CommonTextInput from "../../Components/CommonTextInput";
import { EditOutlined, MailOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;

function Dashboard() {
  const navigate = useNavigate();
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    const fetchEventDates = async () => {
      try {
        const { data } = await getApi({
          url: `http://localhost:3005/conference`,
          method: "Get",
        });
        const conferenceData = data.data.items;
        const eventDates = conferenceData.map(event => event.date);

        setEventDates(eventDates);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEventDates();
  }, []);

  const onFinish = () => {
    Notifications("It's Today!!", "top-right");
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
        <Col span={16} className="gutter-row" >
          <Card className="h-1" title="Event Flow">
            <Row>
              <Col span={12}>
                <h1>Welcome to Event Flow!</h1>
                <p style={{ fontSize: "large", marginTop: "5px" }}>"Your one stop solution for managing and organizing conferences! "</p>
                <p style={{ fontSize: "large", marginTop: "-5px" }}>Lets get into a seamless experience for managing and participating in conference events.</p>

                <Button htmlType="" type="primary" onClick={() => {
                  navigate('/update-profile');
                }}>
                  View Profile
                </Button>
              </Col>
              <Col span={2}></Col>
              <Col span={8}>
                <div className="text-center mt-2">
                  <Link to="/"> <Image preview={false}
                    // className="admin-logo  mb-1" 
                    src="/images/admin-image-1.png" style={{ cursor: "pointer" }} /> </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8} className="gutter-row" >
          <Card title="Information" className="h-1">
            <Collapse />
          </Card>
        </Col>
      </Row >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
        <Col span={12} className="gutter-row">
          <Card hoverable title="Calendar">
            <Calendar />
          </Card>
        </Col>
        <Col span={12} className="gutter-row">
          <Card hoverable title="Countdowns for Events">
            {eventDates.map((eventDate, index) => (
              <Countdown
                key={index}
                title={`Event ${index + 1}`}
                value={eventDate} // Assuming eventDate is a valid date/time
                onFinish={onFinish}
              />
            ))}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
