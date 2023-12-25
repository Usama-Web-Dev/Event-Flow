

import React from "react";
import { Input } from "antd";
import { useField } from "formik";

export const CommonPassword = ({ label, fieldRequired, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-1">
        <label htmlFor={props.id || props.name}>
          {label}
          <span className="error">{fieldRequired}</span>
        </label>
      </div>
      <Input.Password className="w-100" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
