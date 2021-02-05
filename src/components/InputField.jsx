import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, useField } from 'formik';

import { isBrowser } from '../utils/utils';

export const TextInputField = ({
  className,
  id,
  innerRef,
  isRequired,
  label,
  name,
  placeholder,
  type,
}) => {
  const [, meta] = useField(id, name, placeholder, type);

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <Field
        as="input"
        id={id}
        aria-invalid={meta.error && meta.touched ? 'true' : null}
        aria-describedby={meta.error && meta.touched ? `${id}-error` : null}
        aria-required={isRequired ? true : null}
        className={`${className}`}
        name={name}
        placeholder={placeholder}
        type={type}
        innerRef={innerRef}
      />
      <ErrorMessage
        id={`${id}-error`}
        name={name}
        component="small"
      />
    </div>
  );
};

TextInputField.defaultProps = {
  innerRef: null,
  isRequired: null,
  className: '',
};

TextInputField.propTypes = {
  innerRef: isBrowser
    ? PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])
    : PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export const TextAreaField = ({
  id,
  innerRef,
  isRequired,
  label,
  name,
  placeholder,
  rows,
  type,
}) => {
  const [, meta] = useField(id, name, placeholder, type);

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <Field
        as="textarea"
        id={id}
        aria-invalid={meta.error && meta.touched ? 'true' : null}
        aria-describedby={meta.error && meta.touched ? `${id}-error` : null}
        aria-required={isRequired ? true : null}
        name={name}
        placeholder={placeholder}
        rows={rows}
        type={type}
        innerRef={innerRef}
      />
      <ErrorMessage
        id={`${id}-error`}
        name={name}
        component="small"
      />
    </div>
  );
};

TextAreaField.defaultProps = {
  innerRef: null,
  isRequired: false,
  label: '',
  rows: '5',
};

TextAreaField.propTypes = {
  innerRef: isBrowser
    ? PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ])
    : PropTypes.func,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.string,
  type: PropTypes.string.isRequired,
};
