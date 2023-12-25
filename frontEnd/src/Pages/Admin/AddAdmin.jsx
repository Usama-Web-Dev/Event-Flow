import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import CommonTextInput from "../../Components/CommonTextInput";

import { Row, Col, Button, Divider, Select } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { generateSuggestedPassword } from "./../../Helpers/Generic";
import Title from "antd/es/skeleton/Title";
import Typography from "antd";
import { Notifications } from "../../Components/Notifications";
import { postApi } from "../../Services/apiCaller";
import { useNavigate } from "react-router";


// And now we can use these
const AddAdmin = () => {

  const navigate =useNavigate();
  return (
    <>
      <div className="center-bg">
        <div className="shadow p-5">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              gender: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),

                password: Yup.string()            
                  .required('Required')
                  .min(6, 'At least 6 characters'),

                  gender: Yup.string()
                  .required('Required')           
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                alert(JSON.stringify(values, null, 2));
                const { data } = await postApi({
                  
                  url: `http://localhost:3005/user`,
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
          >
            {({ setFieldValue }) => (
              <Form>
                <Row>
                  <Col span={24}>
                    <Divider>
                      <h1>
                        <b>Add Admin</b>
                      </h1>
                    </Divider>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonTextInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      prefix={<UserOutlined />}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonTextInput
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      prefix={<UserOutlined />}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <CommonTextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="jane@formik.com"
                      prefix={<FontAwesomeIcon icon={faEnvelope} />}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={16} className="mt-2">
                    <CommonTextInput
                      label="Admin Password:"
                      name="password"
                      readOnly={true}
                      prefix={<LockFilled />}
                      type="text"
                      placeholder="Password"
                    />
                  </Col>
                  <Col span={8} className="pawd-col mt-2">
                    <Button
                      className="pawd-btn"
                      type="info"
                      onClick={() => {
                        setFieldValue(
                          "password",
                          generateSuggestedPassword("aA0", 6)
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <h4>Gender</h4>

                    <Select
                      style={{ width: "15%" }}
                      placeholder="Select Gender"
                      onChange={(value) => {
                        setFieldValue("gender", value);
                      }}
                      options={[
                        {
                          value: "MALE",
                          label: "Male",
                        },
                        {
                          value: "FEMALE",
                          label: "Female",
                        },
                      ]}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <Button htmlType="submit" type="primary">
                      Save
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

export default AddAdmin;
