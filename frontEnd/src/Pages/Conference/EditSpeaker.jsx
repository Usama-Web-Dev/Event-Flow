import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import ReactQuill from "react-quill";
import CommonTextInput from "../../Components/CommonTextInput";
import { Row, Col, Button, Upload, Divider } from "antd";
import * as Yup from "yup"
import { UploadOutlined, EditOutlined, BankFilled, MailOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { getApi, patchApi } from "../../Services/apiCaller";
import { useNavigate, useParams } from "react-router-dom";
import { Notifications } from "../../Components/Notifications";

const Edit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [speakersData, setSpeakersData] = useState({});
    // const [current] = useState(0);
    useEffect(() => {
        const Edit = async () => {
            const { data } = await getApi({
                url: `http://localhost:3005/speaker/${[params.id]}`,
                method: "Get",
            });
            const res = await data.data;
            setSpeakersData(res);
        }
        Edit();

    }, []);
    console.log(speakersData)
    if (speakersData.name) {
        return (
            <>

                <div className="center-bg">
                    <div className="shadow p-5">
                        <Formik
                            initialValues={{
                                name: speakersData?.name,
                                phoneNumber: speakersData?.phoneNumber,
                                email: speakersData?.email,
                                description: speakersData?.description,
                                biography: speakersData?.biography,
                                affiliation: speakersData?.affiliation,
                                education: speakersData?.education,
                                expertise: speakersData?.expertise,
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required("Speaker Name is required"),
                                phoneNumber: Yup.string()
                                    .matches(/^\03\d{2}\s\d{7}$/, 'Invalid format. Use 03** *******')
                                    .required("Contact Information is required"),
                                email: Yup.string()
                                    .matches(/^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/,
                                        "Email address must include a dot (.) before the TLD")
                                    .email("Invalid email format")
                                    .required("Email address is required"),
                                affiliation: Yup.string().required("Affiliation is required"),
                                education: Yup.string().required("Education is required"),
                                expertise: Yup.string().required("Expertise is required"),
                            })
                            }
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const { data } = await patchApi({
                                        url: `http://localhost:3005/speaker/${[params.id]}`,
                                        method: "PATCH",
                                        body: values,
                                    });

                                    Notifications("Updated Successfully", "success", "top-right");
                                    setSubmitting(false);
                                    navigate("/")
                                }
                                catch (err) {
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

                                    <Row >
                                        < Col className="mt-2" span={24} >
                                            <Divider>
                                                <h1>
                                                    <b>Speaker Information:</b>
                                                </h1>
                                            </Divider>
                                        </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        < Col className="mt-2 gutter-row" span={12}>
                                            <label htmlFor="name"> Speaker Name: </label>
                                        </Col>
                                        < Col className="mt-2 gutter-row" span={12}>
                                            <label htmlFor="speakerPhoto"> Speaker's Photo: </label>
                                        </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col span={12} className="gutter-row">
                                            <CommonTextInput
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Joe Eden"
                                                prefix={<UserOutlined />}
                                            />
                                        </Col>
                                        < Col className="mt-1 gutter-row" span={12}>
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture"
                                            >
                                                <Button icon={<UploadOutlined />}>Upload</Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        < Col className="mt-2 gutter-row" span={12}>
                                            <CommonTextInput
                                                label="Contact Information:"
                                                placeholder="03** *******"
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                prefix={<PhoneOutlined />}
                                                onInput={(e) => {
                                                    const inputValue = e.target.value;
                                                    if (/^\03\d{0,2}\s\d{0,7}$/.test(inputValue)) {
                                                        e.target.setCustomValidity('');
                                                    } else {
                                                        e.target.setCustomValidity('Invalid format. Use 03** *******');
                                                    }
                                                }}
                                            />
                                        </Col>
                                        < Col className="mt-2 gutter-row" span={12}>
                                            <CommonTextInput
                                                label="Email address:"
                                                type="email"
                                                name="email"
                                                prefix={<MailOutlined />}
                                                placeholder="conference@TechHatch.com"
                                                id="email"
                                                pattern="^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$"
                                                onInvalid={(e) => {
                                                    e.target.setCustomValidity('Email address must include a dot (.) before the TLD');
                                                }}
                                                onInput={(e) => {
                                                    e.target.setCustomValidity('');
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-2" span={24}>
                                            Biography:
                                            <ReactQuill
                                                className="mt-1"
                                                name="biography"
                                                id="biography"
                                                value={speakersData.biography || ""}
                                                placeholder="Write about speaker here..."
                                                theme="snow"
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        < Col className="mt-2 gutter-row" span={8}>
                                            <CommonTextInput
                                                label="Affiliation"
                                                type="text"
                                                name="affiliation"
                                                id="affiliation"
                                                prefix={<BankFilled />}
                                                placeholder="Speaker's Affiliation"
                                            />
                                        </Col>
                                        < Col className="mt-2 gutter-row" span={8}>
                                            <CommonTextInput
                                                label="Education"
                                                type="text"
                                                name="education"
                                                id="education"
                                                prefix={<BankFilled />}
                                                placeholder="Speaker Education"
                                            />
                                        </Col>
                                        < Col className="mt-2 gutter-row" span={8}>
                                            <CommonTextInput
                                                label="Expertise"
                                                type="text"
                                                name="expertise"
                                                id="expertise"
                                                placeholder="Speaker Expertise"
                                                prefix={<EditOutlined />}
                                            />
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row gutter={8}>
                                        <Col span={5}>
                                            <Button htmlType="submit" type="primary">Save</Button>
                                        </Col>
                                        <Col span={5}>
                                            <Button
                                                htmlType="cancel"
                                                onClick={() => {
                                                    navigate('/view-speaker');
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
    }
};
export default Edit;
