// //import ReactDOM from 'react-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, Divider, Select } from "antd";

import { CommonSelectInput } from "./../../Components/CommonSelectInput";
import { Row, Col } from "antd";
import CommonTextInput from "../../Components/CommonTextInput";

import { EditOutlined, NumberOutlined, SendOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { postApi } from "../../Services/apiCaller";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../../Components/Notifications";
dayjs.extend(customParseFormat);

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const AddVenue = () => {
  const navigate =useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  return (
    <div className="center-bg">
      <div className="shadow p-5">
        <Formik
          initialValues={{
            type: 'value',
            platform:'platform',
            meetingLink:"meetingLink",
            mapLink: "mapLink",
            floor: 0,
            roomCapacity: 0,
            facilities:'facilities',
          }}
          validationSchema={Yup.object({
            type: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
              map: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
              facilities: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
              amenities: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
              capacity: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}

          onSubmit={async (values, { setSubmitting }) => {
            values.facilities=selectedItems;
            console.log(values.facilities,"1223")
            try {
             
              alert(JSON.stringify(values, null, 2));
              const { data } = await postApi({
                
                url: `http://localhost:3005/venue`,
                method: "POST",
                body: values,
               
              });

             console.log(data.data,'123');
             navigate('/') 
            
            
             Notifications(data.message, "success", "top-right");
             

              setSubmitting(false);
            }
             catch (err) {
              
              Notifications(err?.data?.message, "error", "top-right");
            }
          }}

          // onSubmit={(values, { setSubmitting }) => {
          //   values.facilities=selectedItems;
          //   console.log(values.facilities,"1234")
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));

          //     setSubmitting(false);
          //   }, 400);
          // }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Row>
                <Col span={24}>
                  <Divider>
                    <Title level={2}>Add Venue</Title>
                  </Divider>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="mt-2">
                  <CommonSelectInput
                    name="type"
                    label="Type:"
                    className="selectField"
                    onChange={(event) => {
                      handleSelectChange(event);
                      setFieldValue("type", event);
                    }}
                    options={[
                      {
                        value: "ONLINE",
                        label: "Online",
                      },

                      {
                        value: "ON_SITE",
                        label: "On-Site",
                      },
                    ]}
                  />
                </Col>
              </Row>
              {selectedOption === "ONLINE" ? (
                <div>
                  <Row>
                    <Col span={24} className="mt-2">
                      <CommonTextInput
                        name="platform"
                        label="Platform"
                        type="text"
                        prefix={<SendOutlined />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} className="mt-2">
                      <CommonTextInput
                        name="meetingLink"
                        label="Meeting Link"
                        type="text"
                        prefix={<EditOutlined />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6} className="mt-2">
                      <Button htmlType="submit" type="primary">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </div>
              ) : null}

              {selectedOption === "ON_SITE" ? (
                <div>
                  <Row>
                    <Col span={24} className="mt-2">
                      <Title level={5}>Facilities</Title>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Select
                      name='facilities'
                        mode="multiple"
                        placeholder="Inserted are removed"
                        value={selectedItems}
                        onChange={setSelectedItems}
                     
                        style={{
                          width: "100%",
                        }}
                        options={filteredOptions.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} className="mt-2">
                      <CommonTextInput
                        name=" mapLink"
                        label="Map Link"
                        type="text"
                        prefix={<SendOutlined />}
                      />
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12} className="mt-2">
                      <CommonTextInput
                        name="floor"
                        label="Floor"
                        type="number"
                        prefix={<NumberOutlined />}
                      />
                    </Col>

                    <Col span={12} className="mt-2">
                      <CommonTextInput
                        name="roomCapacity"
                        label="Capacity:"
                        type="number"
                        prefix={<NumberOutlined />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6} className="mt-2">
                      <Button htmlType="submit" type="primary">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVenue;
