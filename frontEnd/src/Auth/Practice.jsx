
// import React, { useEffect, useState } from "react";
// import { Formik, Form } from "formik";
// import { Button, Row, Col, Image } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CommonTextInput } from "../common/CommonTextInput";
// import { Notifications } from "../common/Notifications";
// import { LockOutlined } from "@ant-design/icons";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// import { useNavigate } from "react-router";
// import { Link, useSearchParams } from "react-router-dom";
// import Title from "antd/es/skeleton/Title";
// import loginIcon from "../assets/loginIcon.png";
// import Spiner from '../common/Spiner'
// import { getApi, postApi } from "../services/ApiCaller.service";
// import * as Yup from "yup";
// import { CommonPassword } from "../common/CommonPassword";

// function Signin() {
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams()
//   const navigate = useNavigate();
//   useEffect(() => {
//     const securePage = () => {
//       const token = localStorage.getItem("user-token");
//       if (token) {
//         navigate("/");
//       }
//     };
//     securePage();
//   }, []);
//   return (
//     <>
//       <Formik
//       enableReinitialize={true}
//         initialValues={{
//           email: searchParams.get('email') ?searchParams.get('email') : '',
//           password: "",
//           role: "USER"
//         }}
//         validationSchema={Yup.object({
//           email: Yup.string()
//             .email("Invalid email address")
//             .required("Required"),
//           password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .required('Password is required'),
//         })}
//         onSubmit={async (values, { setSubmitting }) => {
//           try {
//             setLoading(true);
//             const { data } = await postApi({
//               url: `${process.env.REACT_APP_API_URI}/auth/login`,
//               method: "POST",
//               body: values,
//             });
//             const token = data.data.access_token;
//             if (token) {
//               localStorage.clear();
//               localStorage.setItem("user-token", token)
//                 const {data} = await getApi({
//                   url: `${process.env.REACT_APP_API_URI}/user/me`,
//                   method: "GET",
//                 });
//                 await localStorage.setItem("user-role", data.data.role)
//                 await localStorage.setItem("email", data.data.email)
//               navigate('/')
//             }
//             setLoading(false);
//             Notifications(data.message, "success", "top-right");
//             setSubmitting(false);
//           } catch (err) {
//             setLoading(false);
//             Notifications(err?.response?.data?.message, "error", "top-right");
//           }
//         }}
//       >
//         <div className="bg-gradient login_main">
//           <Row style={{ width: "100%" }}>
//             <Col
//               className="mx-auto shadow sign-in-p bg"
//               xs={{ span: 20 }}
//               sm={{ span: 16 }}
//               lg={{ span: 8 }}
//               md={{ span: 12 }}
//             >
//               <Form>
//                 <Row>
//                   <Col className="text-center" span={24}>
//                     <Image
//                       preview={false}
//                       className="logo_img"
//                       src={loginIcon}
//                     />
//                     <Title level={4}>Register Admin</Title>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col span={24} className="mt-1">
//                     <CommonTextInput
//                       label="Email address"
//                       name="email"
//                       className="e2e-login-email"
//                       type="text"
//                       placeholder="you@email.com"
//                       prefix={<FontAwesomeIcon icon={faEnvelope} />}
//                     />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col span={24} className="mt-1">
//                     <CommonPassword
//                       label="Password"
//                       className="e2e-signup-password"
//                       fieldRequired="*"
//                       name="password"
//                       type="password"
//                       prefix={<LockOutlined />}
//                     />
//                   </Col>
//                 </Row>
//                 <br />
//                 <Row className="remember_me">
//                   <div>
//                     <h4 style={{ marginTop: "19px" }}>
//                       <Link to="/reset-password" >
//                         Forgot password?
//                       </Link>
//                     </h4>
//                   </div>
//                 </Row>
//                 <br />
//                 <Row>
//                   <Col span={24} style={{ textAlign: "center" }}>
//                     {loading ? (
//                       <Spiner />
//                     ) : (
//                       <Button
//                         style={{ padding: "0px 15px" }}
//                         type="primary"
//                         htmlType="submit"
//                         className="e2e-login-button"
//                       >
//                         Login
//                       </Button>
//                     )}
//                   </Col>
//                 </Row>
//               </Form>
//               <br />
//               <br />
//               <hr />
//               <Row style={{ justifyContent: 'space-between' }}>
//                 <Col className="sign-in" span={14}>
//                   Any trouble? Email us at
//                 </Col>
//                 <Col span={10} style={{ textAlign: 'right' }}>
//                   <Button type="link" href="mailto:info@example.com">
//                     info@example.com
//                   </Button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </div>
//       </Formik>
//     </>
//   );
// }
// export default Signin;


































// import React, { useState } from 'react'
// import axios from 'axios';
// export default function Practice() {

// const data ={ fname : '',lname : '' };

// const [inData, setData]=useState(data);

// const handleData = (e)=>{
// setData({...inData, [e.target.name]:e.target.value})

// }

// const handleSubmit=(e)=>{
// e.preventDefault();
// axios.post('https://jsonplaceholder.typicode.com/users',inData )
// .then((response)=>{
// console.log(response)
// })
// }

// const handleUpdate=(e)=>{
//     e.preventDefault();
// axios.put('https://jsonplaceholder.typicode.com/users/1',inData )
// .then((response)=>{
// console.log(response)
// })
// }

// const handleDelete=(e)=>{
//     e.preventDefault()
//     axios.delete('https://jsonplaceholder.typicode.com/users/1')
//     .then((response)=>{
//         console.log(response)
//     })
// }


//   return (
//     <>
// <label>First Name </label><br />
// <input type='text' name='fname' value = {inData.fname} onChange={handleData} ></input><br />

// <label>Last Name </label><br />
// <input type='text' name='lname' value = {inData.lname}  onChange={handleData} ></input>
// <br />
// <button  onClick= {handleSubmit} >Submit </button>
// <button  onClick= {handleUpdate} >Update </button>
// <button  onClick= {handleDelete} >Update </button>
//     </>
//   )
// }



//import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'

// export default function Practice() {
//     const [userData,setData]=useState([]);

//     useEffect(()=>{
//         axios.get('https://jsonplaceholder.typicode.com/users')
//         .then((response)=>{
//             console.log(response)
//             setData(response.data);
//         })
//     },[])
//   return (
//     <div>
//       <h1>Practice</h1>
//       {userData.map((data)=>{
//         return(
//             <div>
//                 {data.id}
//                 {data.name}
//             </div>
//         )
//       })}
//     </div>
//   )
// }






// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Formik, Form, useField } from 'formik';
// import { Col, Row } from 'antd';
// import * as Yup from 'yup';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { LockOutlined } from "@ant-design/icons";
// import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
// import CommonTextInput from '../Components/CommonTextInput';

// const MyTextInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props);
//   return (
//     <>
//   <div className="mb-1">
//       <label htmlFor={props.id || props.name}>
//       {label}
//       </label>
// </div>

//       <input className="w-100" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const MyCheckbox = ({ children, ...props }) => {
//   // React treats radios and checkbox inputs differently from other input types: select and textarea.
//   // Formik does this too! When you specify `type` to useField(), it will
//   // return the correct bag of props for you -- a `checked` prop will be included
//   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// // And now we can use these
// const Practice = () => {
//   return (
//     <>


//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//           acceptedTerms: false, // added for our checkbox
//           jobType: '', // added for our select
//         }}
//         validationSchema={Yup.object({
//           firstName: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//           lastName: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('Required'),
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('Required'),
//           acceptedTerms: Yup.boolean()
//             .required('Required')
//             .oneOf([true], 'You must accept the terms and conditions.'),
//           jobType: Yup.string()
//             .oneOf(
//               ['designer', 'development', 'product', 'other'],
//               'Invalid Job Type'
//             )
//             .required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//       <div className="bg-gradient"  style={{paddingTop:'12%', paddingBottom: '12%'}}>
//         <div className="mx-auto w-40 shadow p-3 bg-white"  >
//         <h1>Subscribe!</h1>
//         <Form>

//         <Row   >
//       <Col span={24} >
//           <CommonTextInput
//             label="First Name"
//             name="firstName"
//             type="text"
//             placeholder="Jane"
//             prefix={<FontAwesomeIcon icon={faEnvelope} />}

//           />
//           </Col>
//     </Row>
// <br />
//     <Row   >
//       <Col span={24} >
//           <CommonTextInput
//             label="Last Name"
//             name="lastName"
//             type="text"
//             placeholder="Doe"
//           />
//      </Col>
//     </Row>


//           <MyTextInput
//             label="Email Address"
//             name="email"
//             type="email"
//             placeholder="jane@formik.com"
//           />

//           <MySelect label="Job Type" name="jobType">
//             <option value="">Select a job type</option>
//             <option value="designer">Designer</option>
//             <option value="development">Developer</option>
//             <option value="product">Product Manager</option>
//             <option value="other">Other</option>
//           </MySelect>

//           <MyCheckbox name="acceptedTerms">
//             I accept the terms and conditions
//           </MyCheckbox>

//           <button type="submit">Submit</button>
//         </Form>


//         </div>
//       </div>
//       </Formik>



//     </>
//   );
// };

// export default Practice

// import React from 'react';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import * as Yup from 'yup';
// import { Input, Button, Form as AntForm } from 'antd';

// const validationSchema = Yup.object().shape({
//     newPassword: Yup.string()
//         .required('New Password is required')
//         .max(8, 'New Password must be less than 8 characters')
//         .matches(
//             /^(?=.*[A-Z])(?=.*\d)/,
//             'New Password must contain at least 1 capital letter and 1 number'
//         ),
//     confirmPassword: Yup.string()
//         .required('Confirm Password is required')
//         .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
// });

// const initialValues = {
//     newPassword: '',
//     confirmPassword: '',
// };

// const ResetPassword = () => {
//     const handleSubmit = (values) => {
//         // Handle password reset here
//         console.log(values);
//     };

//     return (
//         <div>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 <Form>
//                     <AntForm.Item
//                         label="New Password"
//                         name="newPassword"
//                         hasFeedback
//                         validateStatus="error"
//                         help={<ErrorMessage name="newPassword" />}
//                     >
//                         <Input.Password />
//                     </AntForm.Item>

//                     <AntForm.Item
//                         label="Confirm Password"
//                         name="confirmPassword"
//                         hasFeedback
//                         validateStatus="error"
//                         help={<ErrorMessage name="confirmPassword" />}
//                     >
//                         <Input.Password />
//                     </AntForm.Item>

//                     <Button type="primary" htmlType="submit">
//                         Reset Password
//                     </Button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// };

// export default ResetPassword;



// import { Button, Col, Divider, Row } from "antd";
// import Title from "antd/es/typography/Title";
// import { Form, Formik } from "formik";
// import React from "react";
// import * as Yup from "yup";
// import { CommonPassword } from '../Components/CommonPassword';
// import { LockOutlined } from '@ant-design/icons';


// function UpdatePassword() {

//     return (

//         <Formik
//             initialValues={{
//                 password: "",
//                 confirmPassword: "",

//             }}
//             validationSchema={Yup.object({

//                 password: Yup.string()
//                     .required("Password is required")
//                     .matches(
//                         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
//                         "Must contain 5 characters, atleast one uppercase and one numeric"
//                     ),
//                 confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password must match")
//             })}
//             onSubmit={(values, { setSubmitting }) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 400);
//             }}
//         >
//             {({ setFieldValue }) => (
//                 <div className="update-password shadow p-5">
//                     <Form >

//                         <Row >
//                             <Col span={24}>
//                                 <Divider>
//                                     <Title level={4}>Update Password</Title>
//                                 </Divider>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col span={24} className="mt-1">

//                                 <CommonPassword
//                                     label="New Password"
//                                     //   fieldRequired=""
//                                     name="password"
//                                     type="password"
//                                     prefix={<LockOutlined />}

//                                 />
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col span={24} className="mt-1">
//                                 <CommonPassword
//                                     label="Confirm Password"
//                                     //   fieldRequired=""
//                                     name="confirmPassword"
//                                     type="password"
//                                     prefix={<LockOutlined />}

//                                 />
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col span={24} className="mt-1">
//                                 <Button type="primary" htmlType="submit">
//                                     Submit
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </div>
//             )}
//         </Formik>
//     );

// }

// export default UpdatePassword
