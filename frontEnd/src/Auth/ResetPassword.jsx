import React from "react";
import "./Auth.css";
import { Col, Row, Image, Typography, Button } from "antd";
import { Formik, Form } from "formik";

// import { Notifications } from "../components/Common/Notifications";
// import { postApi } from "../Services/ApiCaller.service";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CommonTextInput from "../Components/CommonTextInput";
import { postApi } from "../Services/apiCaller";
import { Notifications } from "../Components/Notifications";

const { Title } = Typography;

function ResetPassword() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
      })}
     
      onSubmit={async (values, { setSubmitting }) => {

       await  localStorage.setItem("user-email", values.email);
        try {
         
          const { data } = await postApi({
            url: `http://localhost:3005/auth/forget-password`,
            method: "POST",
            body: values,
           
          });
      
          navigate('/verification-code')
          
        
       
          Notifications(data.message, "success", "top-right");

          setSubmitting(false);
        }
         catch (err) {
          
          Notifications(err?.data?.message, "error", "top-right");
        }
      }}



    >
      {({ errors, touched, setFieldValue }) => (
        <div className="bg-gradient reset-password-background display-center">
          <div className="mx-auto w-40 shadow p-3 bg-white">
            <Form id="asd">
              <Row>
                <Col className="text-center" span={24}>
                  <Image
                    preview={false}
                    className="admin-from-img"
                    src="/images/admin-image-1.png"
                  />
                  <Title level={4}>Recover Password</Title>
                </Col>
                <Col span={24} className="mt-1">
               
              
                  <CommonTextInput
                    label="Email Address"
                    fieldRequired="*"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                  />
                </Col>
                <Col span={24} className="mt-1">
                  <Button type="primary" htmlType="submit">
                    Send Email
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ResetPassword;
