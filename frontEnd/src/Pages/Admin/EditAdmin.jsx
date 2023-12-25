import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import CommonTextInput from "../../Components/CommonTextInput";

import { Row, Col, Button, Divider, Select } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// import { useParams } from "react-router";
import { useEffect } from "react";
import { getApi, patchApi } from "../../Services/apiCaller";
import { useNavigate, useParams } from "react-router-dom";
import { Notifications } from "../../Components/Notifications";

const EditAdmin = () => {
  const params = useParams();
const navigate =useNavigate();
  const [adminsData, setAdminsData] = useState({});

  useEffect(()=>{
    const Edit= async ()=>{
    const {data} =await getApi({
      url:`http://localhost:3005/user/${[params.id]}`,
    method: "Get",
    });
    const res = await data.data;
    setAdminsData(res);
    }
    Edit();

    }, [] );
if(adminsData.firstName){
  return (
    <>
      <div className="center-bg">
        <div className="shadow p-5">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: adminsData?.firstName,
              lastName: adminsData?.lastName,
              email: adminsData?.email,
              gender:null
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
                .required("Required")
                // password: Yup.string()
                //   .password('Invalid Password')
                //   .required('Required'),

                .required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try{
           
                const {data} = await patchApi({
                  url: `http://localhost:3005/user/${[params.id]}`,      
                  method: "PATCH",
                  body: values,
                });
             
                Notifications("Updated Successfully", "success", "top-right");
                setSubmitting(false);
                navigate("/")
              }
              catch (err){
                // if(!err?.data){
               
                //   Notifications("No Server Responce", "error", "top-right");
                // } else if(err.data?.status === 409){
                //   Notifications("Name Already Exist", "error", "top-right");
                // }else{
                //   Notifications("Failed", "error", "top-right");
                // }
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Row>
                  <Col span={24}>
                    <Divider>
                      <h1>
                        <b>Edit Admin</b>
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
                      disabled={true}
                      placeholder="jane@formik.com"
                      prefix={<FontAwesomeIcon icon={faEnvelope} />}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="mt-2">
                    <h4>Gender</h4>
                    <Select
                      name='gender'
                      defaultValue={adminsData?.gender}
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
                      style={{ width: "15%" }}
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
}

};

export default EditAdmin;
