import React from "react";
import { Input } from "antd";
import { useField } from "formik";

export const CommonTextInput = ({ label, fieldRequired, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-1">
        <label htmlFor={props.id || props.name}>
          {label}
          <span className="error">{fieldRequired}</span>
        </label>
      </div>
      <Input className="w-100" size="large"  {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className=" error">{meta.error}</div>
      ) : null}
    </>
  );
};
export default CommonTextInput
