import React from 'react';
import {
  Button,
  Flex,
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea as ChakraTextarea,
} from '@chakra-ui/react';
import { defaultComponents } from '@formium/react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const SubmitButton = () => (
  <Flex justify="flex-end">
    <Button mt={4} bg="red.100" type="submit">
      Send
    </Button>
  </Flex>
);

const FormControl = ({
  description, error, label, children,
}) => {
  const {
    id, name, placeholder, required, type,
  } = children.props;
  const [field] = useField(id, name, placeholder, type);
  const { onBlur, onChange } = field;
  const isTextInput = !!(children.props.as?.type && children.props.as.type.name === 'TextInput');
  const isTextarea = children.props.as.name === 'Textarea';

  return (
    <ChakraFormControl isInvalid={error}>
      <FormLabel htmlFor="name">{label}</FormLabel>
      {isTextInput && (
        <Input
          focusBorderColor="pink.100"
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
        />
      )}
      {isTextarea && (
        <ChakraTextarea
          focusBorderColor="pink.100"
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          size="sm"
          rows={5}
        />
      )}
      {error
        ? <FormErrorMessage>{error}</FormErrorMessage>
        : <FormHelperText>{description}</FormHelperText>}
    </ChakraFormControl>
  );
};

FormControl.defaultProps = {
  error: '',
};

FormControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  description: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  label: PropTypes.string.isRequired,
};

const formiumComponents = {
  ...defaultComponents,
  FormControl,
  SubmitButton,
  Textarea: () => <ChakraTextarea />,
};

export { formiumComponents as default };
