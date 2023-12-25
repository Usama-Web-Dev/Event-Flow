import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CommonTextInput from "../../Components/CommonTextInput";
import { CommonSelectInput } from "./../../Components/CommonSelectInput";
import { Row, Col, TimePicker, Space, Typography } from "antd";
import { Button, DatePicker, Divider } from "antd";
import * as Yup from "yup"
import { getApi, patchApi } from "../../Services/apiCaller";
import { useNavigate, useParams } from "react-router-dom";
import { Notifications } from "../../Components/Notifications";
import { values } from "lodash";
const { Text } = Typography;
//date formating
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [conferencesData, setConferencesData] = useState({});

  useEffect(() => {
    const Edit = async () => {
      const { data } = await getApi({
        url: `http://localhost:3005/conference/${[params.id]}`,
        method: "Get",
      });
      const res = await data.data;
      setConferencesData(res);
    }
    Edit();

  }, []);
  if (conferencesData.title) {
    return (
      <>
        <div className="center-bg">
          <div className="shadow p-5">
            <Formik
              initialValues={{
                title: conferencesData?.title,
                type: conferencesData?.type,
                description: conferencesData?.description,
                date: conferencesData?.date,
                startTime: conferencesData?.startTime,
                endTime: conferencesData?.endTime,
                objective: conferencesData.objective,
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
                type: Yup.string().required("Conference Type is required"),
                description: Yup.string().required("Description is required"),
                date: Yup.date().required("Date is required"),
                startTime: Yup.array()
                  .of(Yup.date().typeError("Invalid time format"))
                  .required("Time Duration is required"),
                endTime: Yup.array()
                  .of(Yup.date().typeError("Invalid time format"))
                  .required("Time Duration is required"),
                objective: Yup.string().required("Objectives is required"),
              })
              }
              onSubmit={async (values, { setSubmitting }) => {
                alert(values)
                try {
                  const { data } = await patchApi({
                    url: `http://localhost:3005/conference/${[params.id]}`,
                    method: "PATCH",
                    body: values,
                  });
                  Notifications("Updated Successfully", "success", "top-right");
                  setSubmitting(false);
                  navigate("/");
                } catch (err) {
                  // Handle API errors here
                  console.error("API Error:", err);
                }
              }}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Row >
                    <Col span={24} >
                      <Divider>
                        <h1>
                          <b>Edit Conference</b>
                        </h1>
                      </Divider>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="mt-2">
                      <CommonTextInput
                        label="Conference Title:"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Web Seminar"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="mt-2">
                      <CommonSelectInput
                        name="type"
                        label="Conference Type:"
                        className="selectField"
                        size="large"
                        onChange={(value) => {
                          setFieldValue("type", value)
                        }}
                        options={[
                          {
                            value: "",
                            label: "Select",
                          },
                          {
                            value: "SESSION",
                            label: "Session",
                          },
                          {
                            value: "PRESENTATION",
                            label: "Presentation",
                          },
                          {
                            value: "WORKSHOP",
                            label: "Workshop",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row >
                    <Col className="mt-1" span={24}>
                      <Text strong>
                        Description:
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-3" span={24}>
                      <ReactQuill
                        name="description"
                        id="description"
                        placeholder="Describe your Conference here..."
                        readOnly={false}
                        // value={values.description || conferencesData.description || ""}
                        value={conferencesData.description || ""}
                        onChange={(value) => {
                          setFieldValue("description", value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2" span={12}>
                      <label htmlFor="selectdate">Select Date of Conference: </label>
                    </Col>
                    <Col className="mt-2" span={12}>
                      <label htmlFor="selecttime">Select Start and End Time: </label>
                    </Col>
                  </Row>
                  <Row>
                    < Col className="mt-3" span={12}>
                      <Space direction="vertical" size={12}>
                        <DatePicker
                          name="date" id="date"
                          // defaultValue={dayjs('01/01/2015')} format={'DD-MM-YYYY'}
                          format={"YYYY-MM-DD"}
                          // placeholder="2022/12/31"
                          onChange={(value) => {
                            // console.log(event);
                            setFieldValue("date", value);
                          }}
                        />
                      </Space>
                    </Col>
                    <Col className="mt-3" span={12} >
                      <Space>
                        <TimePicker
                          label="Start Time:"
                          use12Hours
                          onChange={(value) => {
                            setFieldValue("startTime", value);
                          }}
                          placeholder="Start Time"
                        />
                        <TimePicker
                          label="End Time:"
                          use12Hours
                          onChange={(value) => {
                            setFieldValue("endTime", value);
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
                        id="objective"
                        label="Objectives"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={8}>
                    <Col span={5}>
                      <Button htmlType="submit" type="primary"  >Save Changes</Button>
                    </Col>
                    <Col span={5}>
                      <Button
                        htmlType="cancel"
                        onClick={() => {
                          navigate('/view');
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div >
        </div>
      </>
    );
    // }
  }
};
export default Edit;
