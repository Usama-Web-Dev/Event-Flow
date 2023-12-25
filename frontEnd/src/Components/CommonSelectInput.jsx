


  import React from "react";
import { Select } from 'antd';
import { useField } from "formik";


export const CommonSelectInput = ({ label, fieldRequired, ...props }) => {
  // console.log(props,'common select');
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-1">
        <label htmlFor={props.id || props.name}>
          {label}
          <span className="error">{fieldRequired}</span>
        </label>
      </div>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
 