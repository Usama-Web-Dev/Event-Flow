import React, { useState } from "react";
//import ReactDOM from 'react-dom';
import { Formik, Form, useField } from "formik";
// import * as Yup from "yup";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker, Divider } from "antd";

import { CommonSelectInput } from "./../../Components/CommonSelectInput";
import { Row, Col, TimePicker, Space } from "antd";
import CommonTextInput from "../../Components/CommonTextInput";
import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";
import { postApi } from "../../Services/apiCaller";
import { Notifications } from "../../Components/Notifications";
import moment from "moment-timezone";

const Add = () => {
  const navigate = useNavigate();
  moment.tz.setDefault("Asia/Karachi");
  // const [value, setValue] = useState("");

  return (
    <>
      <div className="center-bg">
        <div className="shadow p-5">
          <Formik
            initialValues={{
              title: "",
              type: "",
              description: "",
              date: "",
              startTime: "",
              endTime: "",
              objective: ""
            }}
            // validationSchema=
            // {Yup.object({

            // title: Yup.string()
            //   .required("Required"),

            //   type: Yup.string()

            //     .required("Required"),

            //   description: Yup.string()
            // .max(100, "Must be 100 characters or less")
            // .required("Required"),

            //  date: Yup
            //        .date()
            //      .max(new Date())
            //      .required("Required"),




            // startTime: Yup.boolean()
            //   .required("Required"),

            // endTime: Yup.boolean()
            //   .required("Required"),

            //   objective: Yup.string()
            //   .required("Required"),

            // })}

            onSubmit={async (values, { setSubmitting }) => {
              try {
                alert(JSON.stringify(values, null, 2));
                const { data } = await postApi({
                  url: `http://localhost:3005/conference`,
                  method: "POST",
                  body: values,
                });

                console.log(data.data, "123");
                navigate("/add-speaker");

                Notifications(data.message, "success", "top-right");

                setSubmitting(false);
              } catch (err) {
                Notifications(err?.data?.message, "error", "top-right");
              }
            }}

          // onSubmit={(values, { setSubmitting }) => {
          //   // values.day=date;
          //   console.log(values,'11111111111111111');
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //     // navigate("/add-speaker");
          //   }, 400);
          // }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Row>
                  <Col span={24}>
                    <Divider>
                      <Title level={2}>Add Conference</Title>
                    </Divider>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonTextInput
                      name="title"
                      label="Conference Title:"
                      type="text"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonSelectInput
                      name="type"

                      label="Conference Type:"
                      className="selectField"
                      placeholder="Select Conference"
                      onChange={(event) => {
                        setFieldValue("type", event);
                      }}
                      options={[
                        {
                          value: "PRESENTATION",
                          label: "Presentation",
                        },

                        {
                          value: "SESSION",
                          label: "Session",
                        },

                        {
                          value: "WORK_SHOP",
                          label: "WorkShop",
                        },
                      ]}
                    />
                  </Col>
                </Row>

                <Row className="mt-2 ">
                  <Col span={24}>
                    <label htmlFor="description">Description:</label>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col span={24}>
                    <ReactQuill
                      name="description"
                      placeholder="Write something awesome.."
                      theme="snow"
                      onChange={(event) => {
                        setFieldValue("description", event);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <label htmlFor="selectdate">Select Date</label>
                  </Col>
                </Row>

                <Row>
                  <Col span={6} className="mt-3">
                    <Space direction="vertical">
                      <DatePicker
                        // defaultValue={dayjs('01/01/2015')} format={'DD-MM-YYYY'}
                        format={"DD-MM-YYYY"}
                        placeholder="01/01/2015"
                        onChange={(event) => {
                          console.log(event);
                          setFieldValue("date", event);
                        }}
                      />
                    </Space>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <label htmlFor="email">Select Time</label>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col span={24}>
                    <Space>
                      <TimePicker
                        use12Hours
                        onChange={(event) => {
                          setFieldValue("startTime", event);
                        }}
                        placeholder="Start Time"
                      />
                      <TimePicker
                        use12Hours
                        onChange={(event) => {
                          setFieldValue("endTime", event);
                        }}
                        placeholder="End Time"
                      />
                    </Space>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonTextInput
                      name="objective"
                      label="Objectives"
                      type="text"
                    />
                  </Col>
                </Row>


                <Row>
                  <Col span={24} className="mt-2">
                    <Button htmlType="submit" type="primary">
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Add;
