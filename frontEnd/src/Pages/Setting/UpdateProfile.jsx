import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import CommonTextInput from "../../Components/CommonTextInput";

import { Row, Col, Button, Divider, Select } from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { generateSuggestedPassword } from "./../../Helpers/Generic";
import Title from "antd/es/typography/Title";

// import ImgCrop from 'antd-img-crop';
import { useState } from "react";
import { Upload } from "antd";
import { getApi, patchApi } from "../../Services/apiCaller";
import { useNavigate, useParams } from "react-router-dom";
import { Notifications } from "../../Components/Notifications";

// And now we can use these
const UpdateProfile = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <div className="center-bg">
        <div className="shadow p-5">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: "",
              lastName: "",
              image:null
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              // email: Yup.string()
              //   .email("Invalid email address")
              //   .required("Required")
              // password: Yup.string()
              //   .password('Invalid Password')
              //   .required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // console.log("123");
                console.log(fileList);
                
                values.image=fileList[0]['originFileObj'];
                alert(values)


                const responce = await patchApi({
                  url: `http://localhost:3005/user/me${[params.id]}`,
                  method: "PATCH",
                  body: values,
                  options: {
                    headers:{
                      "Content-Type": "multipart/form-data",
                    }
                  }
                });

                Notifications("Updated Successfully", "success", "top-right");
                setSubmitting(false);
                navigate("/");
              } catch (err) {
                if (!err?.responce) {
                  Notifications("No Server Responce", "error", "top-right");
                } else if (err.responce?.status === 409) {
                  Notifications("Username Taken", "error", "top-right");
                } else {
                  Notifications("Updation Failed", "error", "top-right");
                }
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Row>
                  <Col span={24}>
                    <Divider>
                      <Title level={4}>Update Profile</Title>
                    </Divider>
                  </Col>
                </Row>

                <Row gutter={100}>
                  <Col span={18} className="mt-2">
                    <CommonTextInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      prefix={<UserOutlined />}
                    />

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
                  </Col>

                  <Col span={6} className="mt-2">
                    <Upload
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-circle"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
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

export default UpdateProfile;
