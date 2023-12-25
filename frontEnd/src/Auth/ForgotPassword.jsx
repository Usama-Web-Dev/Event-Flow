import React from 'react'
import "./Auth.css";
import { Col, Row, Image, Typography, Button, Divider } from "antd";
import { Formik, Form } from "formik";
import { CommonPassword } from '../Components/CommonPassword';
// import { Notifications } from "../components/Common/Notifications";
// import { postApi } from "../Services/ApiCaller.service";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import CommonTextInput from "../Components/CommonTextInput";
import { LockOutlined } from '@ant-design/icons';
import { postApi } from '../Services/apiCaller';
import { Notifications } from '../Components/Notifications';

const { Title } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",

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
                        values.email = localStorage.getItem("user-email");


                        const { data } = await postApi({
                            url: `http://localhost:3005/auth/update-password`,
                            method: "POST",
                            body: values,

                        });

                        navigate('/Login')



                        Notifications(data.message, "success", "top-right");

                        setSubmitting(false);
                    }
                    catch (err) {

                        Notifications(err?.data?.message, "error", "top-right");
                    }
                }}
            >
                {({ errors, touched, setFieldValue }) => (
                    <div className="bg-gradient reset-password-background display-center" >
                        <div className="mx-auto w-40 shadow p-3 bg-white">
                            <Form id="asd">
                                <Row>
                                    <Col className="text-center" span={24}>
                                        <Image
                                            preview={false}
                                            className="admin-from-img"
                                            src="/images/admin-image-1.png"
                                        />
                                        <Title level={4}>Change Your Password</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} className="mt-1">
                                        <CommonPassword
                                            label="Enter Your New Password"
                                            name="password"
                                            type="password"
                                            prefix={<LockOutlined />}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} className="mt-1">
                                        <CommonPassword
                                            label="Confirm Your New Password"
                                            name="confirmPassword"
                                            type="password"
                                            prefix={<LockOutlined />}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} className="mt-1">
                                        <Button type="primary" htmlType="submit">
                                            Create password
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik >
        </>
    )
}
export default ForgotPassword



