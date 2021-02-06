import { createClient } from '@formium/client';

export const formium = createClient(process.env.GATSBY_FORMIUM_PROJECTID);

export const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter your name.';
  }
  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please check your email address.';
  }
  if (!values.message) {
    errors.message = 'Please enter a message.';
  } else if (values.message.length > 1024) {
    errors.message = 'Please limit your message to 1000 characters.';
  }
  return errors;
};
