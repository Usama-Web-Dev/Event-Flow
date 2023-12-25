

import { Button, Col, Divider, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CommonPassword } from './../../Components/CommonPassword';
import { LockOutlined } from '@ant-design/icons';
import { patchApi, postApi } from "../../Services/apiCaller";
import { Notifications } from "../../Components/Notifications";
import { useNavigate, useParams } from "react-router-dom";


function UpdatePassword() {
const navigate =useNavigate()
const params =useParams()


  return (

    <div className="center-bg">
        <div className="shadow p-5">
    <Formik
      initialValues={{
        password: "",
        oldPassword: "",

      }}
      validationSchema={Yup.object({

        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
            "Must contain 5 characters, atleast one uppercase and one numeric"
          ),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password must match")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        
        try {
        
      
        

          const { data } = await patchApi({
            url: `http://localhost:3005/user/change-password-me${[params.id]}`,
            method: "PATCH",
            body: values,
           
          });
       
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
       
          <Form >

            <Row >
              <Col span={24}>
                <Divider>
                  <Title level={4}>Update Password</Title>
                </Divider>
              </Col>
            </Row>

            <Row>
              <Col span={24} className="mt-1">

                <CommonPassword
                  label="New Password"
                  //   fieldRequired=""
                  name="password"
                  type="password"
                  prefix={<LockOutlined />}

                />
              </Col>
            </Row>

            <Row>
              <Col span={24} className="mt-1">
                <CommonPassword
                  label="Confirm Password"
                  //   fieldRequired=""
                  name="confirmPassword"
                  type="password"
                  prefix={<LockOutlined />}

                />
              </Col>
            </Row>


            <Row>
              <Col span={24} className="mt-1">
                <CommonPassword
                  label="Old Password"
                  //   fieldRequired=""
                  name="oldPassword"
                  type="password"
                  prefix={<LockOutlined />}

                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="mt-1">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        
      )}
    </Formik>
 </div>
 </div>

  );

}

export default UpdatePassword
