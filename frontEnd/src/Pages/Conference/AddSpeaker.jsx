import React, { useState } from "react";
//import ReactDOM from 'react-dom';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, DatePicker, Divider, Upload, message } from "antd";
//import 'quill/dist/quill.snow.css';
//import { Quill } from "react-quill";
//import { useQuill } from 'react-quilljs';
//import { CommonSelectInput } from './../Components/CommonSelectInput';
//import { CommonTextInput } from './../Components/CommonTextInput';

import { CommonSelectInput } from "./../../Components/CommonSelectInput";
import { Row, Col, TimePicker, Space } from "antd";
import CommonTextInput from "../../Components/CommonTextInput";
import { useNavigate } from "react-router";
import {
  BankFilled,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UpOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import { Notifications } from "../../Components/Notifications";
import { postApi } from "../../Services/apiCaller";
import { element } from "prop-types";
dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYY";

const AddSpeaker = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");

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
              name: "",
              email: "",
              phoneNumber: "",
              description: "",
              education: "",
              affiliation: "",
              expertise: "",
              biography: "",
              files: [],
              // name: "",
              // biography: "",
              // desciption: "",
              // files: null,
              // phoneNumber: "",
              // affilliation: "",
              // expertise: "",
              // email: "",
              // education: "",
            }}
            // validationSchema={Yup.object({
            //   name: Yup.string()
            //     .max(15, "Must be 15 characters or less")
            //     .required("Required"),
            //     biography: Yup.string()
            //     .max(100, "Must be 100 characters or less")
            //     .required("Required"),

            //     description: Yup.string()
            //     .max(100, "Must be 100 characters or less")
            //     .required("Required"),

            //    //photo: Yup.boolean()
            //   //   .required("Required"),
            //   // number: Yup.number()
            //   // .max(12, "12 digit number")
            //   // .required("Required"),

            //   affilliated: Yup.string()
            //     .max(20, "Must be 20 characters or less")
            //     .required("Required"),

            //     expertise: Yup.string()
            //     .max(20, "Must be 20 characters or less")
            //     .required("Required"),

            //     email: Yup.string()
            //     .email("Invalid email address")
            //     .required("Required"),

            //     education: Yup.string()
            //     .max(20, "Must be 20 characters or less")
            //     .required("Required"),

            // })}

            onSubmit={async (values, { setSubmitting }) => {
              
             
              let tempArr = [];
              fileList.forEach((element) => {
                console.log(element);
                tempArr.push(element.originFileObj);
                
              });
                  console.log(tempArr,"1234")
              values.files = tempArr;
              
              alert(values);

              try {
                console.log("123");

            
                console.log(fileList);

                const responce = await postApi({
                  url: `http://localhost:3005/speaker`,
                  method: "POST",
                  body: values,
                  options: {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  },
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

            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //     navigate("/add-venue");
            //   }, 400);
            // }}
          >
            {({ setFieldValue }) => (
              <Form>
                <Row>
                  <Col span={24}>
                    <Divider>
                      <Title level={2}>Add Speaker</Title>
                    </Divider>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col span={24}>
                    <CommonTextInput
                      name="name"
                      label="Name:"
                      placeholder="Full Name"
                      prefix={<UserOutlined />}
                    />
                  </Col>
                </Row>

                <Row className="mt-2 ">
                  <Col span={24}>
                    <label htmlFor="bio">Biography</label>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <ReactQuill
                      className="mt-3"
                      name="biography"
                      placeholder="Write something awesome.."
                      theme="snow"
                      onChange={(event) => {
                        setFieldValue("biography", event);
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mt-2 ">
                  <Col span={24}>
                    <label className="mt-3" htmlFor="descrition">
                      Descrition
                    </label>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <ReactQuill
                      className="mt-3"
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
                  <Col span={12} className="mt-2 ">
                    <label htmlFor="photo">Image</label>
                  </Col>

                  <Col span={12} className="mt-2 ">
                    <label htmlFor="photo">Phone Number</label>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12} className="mt-3 ">
                    <Upload
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      multiple={true}
                    >
                      {/* {fileList.length < 1 && "+ Upload"} */}
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                    {/* <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    accept="image/png , image/jpeg, image/jpg, image/gif"
                    // defaultFileList={[...fileList]}
                    className="upload-list-inline"
                    // onChange={(e)=>{
                    //   let tempArr=[]
                    //   e.fileList.map((img)=>{
                    //     tempArr.push


                    //   })



                    // }}
                    

                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload> */}
                  </Col>

                  <Col span={6}>
                    <CommonTextInput
                      name="phoneNumber"
                      type="number"
                      prefix={<PhoneOutlined />}
                      placeholder="without slash"
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12} className="mt-2 ">
                    <CommonTextInput
                      name="affiliation"
                      label="Affiliated:"
                      placeholder="Affiliation"
                      prefix={<BankFilled />}
                    />
                  </Col>

                  <Col span={12} className="mt-2 ">
                    <CommonTextInput
                      name="expertise"
                      label="Expertise:"
                      placeholder="expertise"
                      prefix={<EditOutlined />}
                    />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12} className="mt-2 ">
                    <CommonTextInput
                      name="email"
                      label="Email:"
                      placeholder="Email"
                      type="email"
                      prefix={<MailOutlined />}
                    />
                  </Col>

                  <Col span={12} className="mt-2 ">
                    <CommonTextInput
                      name="education"
                      label="Education:"
                      placeholder="Education"
                      prefix={<BankFilled />}
                    />
                  </Col>
                </Row>

                <br />
                <br />

                <Button htmlType="submit" type="primary">
                  Next
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddSpeaker;
