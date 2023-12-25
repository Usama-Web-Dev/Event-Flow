import React from "react";
import "./Auth.css";
import { Col, Row, Image, Typography, Button } from "antd";
import { Formik, Form } from "formik";

// import { Notifications } from "../components/Common/Notifications";
// import { postApi } from "../Services/ApiCaller.service";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useState } from "react";
import OtpInput from "react-otp-input";
import { postApi } from "../Services/apiCaller";
import { Notifications } from "../Components/Notifications";

const { Title } = Typography;

function VerificationCode() {
  const [Otp, setOtp] = useState("");

  const navigate = useNavigate();







  return (
    <Formik



      initialValues={{
        email: "",
        passVerificationCode: ""
      }}


      // validationSchema={Yup.object({
      //   email: Yup.string()
      //     .email("Invalid email address")
      //     .required("Email required"),
      // })}


      onSubmit={async (values, { setSubmitting }) => {

        try {
          values.email = localStorage.getItem("user-email");
          values.passVerificationCode = Otp;

          const { data } = await postApi({
            url: `http://localhost:3005/auth/forget-password-verification-code`,
            method: "POST",
            body: values,

          });

          navigate('/forgot-password')



          Notifications(data.message, "success", "top-right");

          setSubmitting(false);
        }
        catch (err) {

          Notifications(err?.data?.message, "error", "top-right");
        }
      }}


    >
      {({ errors, touched, setFieldValue }) => (
        <div
          className="bg-gradient reset-password-background display-center"
          
        >
          <div className="mx-auto w-40 shadow p-3 bg-white">
            <Form id="asd">
              <Row>
                <Col className="text-center" span={24}>
                  <Image
                    preview={false}
                    className="admin-from-img"
                    src="/images/admin-image-1.png"
                  />
                </Col>
              </Row>


              <Row>
                <Col span={24} className="mt-2">
                  <div className="d-flex-v-center">
                    {/* onChange={(value) => {
                        setFieldValue("gender", value);
                      }} */}

                    <OtpInput
                      inputStyle={'abc'}
                      value={Otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />
                      }


                    />


                  </div>

                </Col>
              </Row>



              <Row>
                <Col span={24} className="text-center mt-2">
                  <Button type="primary" htmlType="submit">
                    Submit
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

export default VerificationCode;
