import React, {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ChangeEvent
} from "react";
import styled from "./index.module.scss";
import cn from "classnames/bind";
import { withLogger } from "hoc";

const stylesCx = cn.bind(styled);

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: InputType;
  fieldType?: FormField;
  disabled?: boolean;
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const BaseFormField: FC<Props> = ({
  onChange,
  type = "text",
  fieldType = "input",
  disabled,
  hasError,
  ...attrs
}) => {
  const classNames = stylesCx({
    formField: true,
    hasError
  });

  const Field = fieldType;

  return (
    <Field
      type={type}
      disabled={disabled}
      className={classNames}
      onChange={onChange}
      {...attrs}
    />
  );
};

const FormField = withLogger<Props>(BaseFormField, "FormField");

export { FormField };
