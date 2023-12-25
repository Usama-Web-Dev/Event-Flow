import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {  Button,Row, Col, Image, Checkbox } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LockOutlined } from "@ant-design/icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import Title from 'antd/es/skeleton/Title';
import { CommonTextInput } from './../Components/CommonTextInput';
import { Link } from 'react-router-dom';
import { CommonPassword } from '../Components/CommonPassword';
import { Notifications } from '../Components/Notifications';
import { getApi, postApi } from '../Services/apiCaller';
import { useNavigate } from 'react-router-dom';

const MyCheckbox = ({ children, ...props }) => {
 
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className="mt-1">
      <label className="checkbox-input e2e-login-checkBox">
        <Checkbox type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};




export const Login = () => {

  const navigate =useNavigate();
 
  return (
    <>
          <Formik
            initialValues={{
              email: '',
              password: '',
              acceptedTerms:false,
            }}
            validationSchema={Yup.object({
              email: Yup.string()
             
                .required('Required'),
            })}

            onSubmit={async (values, { setSubmitting }) => {
              try {
                
                const { data } = await postApi({
                  url: `http://localhost:3005/auth/login`,
                  method: "POST",
                  body: values,
                 
                });
               console.log(data,'123');
                const token = data.data.access_token;
                
                if (token) {
                  localStorage.clear();
                  localStorage.setItem("user-token", token)
                    const {data} = await getApi({
                      url: `http://localhost:3005/user/me`,
                      method: "GET",
                    });
                    console.log(data,'123');
                    await localStorage.setItem("user-role", data.data.role)      
                    await localStorage.setItem("email", data.data.email)
                  navigate('/')
                }
              
                Notifications(data.message, "success", "top-right");

                setSubmitting(false);
              }
               catch (err) {
                
                Notifications(err?.data?.message, "error", "top-right");
              }
            }}
            // style={{ paddingTop: "11%" , paddingBottom: "12%"}}
            // <div className="mx-auto w-40 shadow p-3 bg-white "  >
          >
              <div className="bg-gradient  display-center "   >
              <div className=" mx-auto w-40 shadow p-3 bg-white "  >
                <Form>
                <Row>
                <Col className="text-center" span={24}>
                  <Image
                    preview={false}
                    className="admin-from-img"
                    src="/images/admin-image-1.png"
                  />
                  <Title level={4}>Login Admin</Title>
                </Col>
              </Row>
                   <Row>
                        <Col span={24} className="mt-1">
                          <CommonTextInput
                            label="Email address"
                            name="email" 
                            type="email"
                            placeholder="you@email.com"
                            prefix={<FontAwesomeIcon icon={faEnvelope} />}
                          />
                        </Col>
                    </Row>
                    <Row>
                      <Col span={24} className="mt-2">


                      <CommonPassword
                     
                          label="Password"                       
                          name="password"
                          type="password"
                          placeholder="password"
                          prefix={<LockOutlined />}
                        />
                      </Col>
                    </Row>
                    <Row className='f-password'>
                      <div>
                            <MyCheckbox name="acceptedTerms">
                              <span className='ml-1'>Remember Me</span>
                            </MyCheckbox>
                      </div>
                      <div>
                        <h4 className="ml-1">
                       
                        <Link to="/reset-password">Forget Password</Link>
                        </h4>
                      </div>
                    </Row>



                    <br/>
                   
                    <br/>
                    <Row>
                      <Col span={24}>
                      
                      <Button type="primary" htmlType="submit" className="e2e-login-button">
                        Login
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                 
                
          </div>
      </div>

          </Formik>
    </>
  );
};

export default Login