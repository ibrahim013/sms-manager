import Validator from 'validator';
import isEmpty from './is-empty';


const validateContact = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'name must be between 2 and 20 character';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'name can not be empty';
  }
  if (!Validator.isLength(data.phoneNumber, { min: 11, max: 11 })) {
    errors.phoneNumber = 'enter a valid phone number';
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'phone number can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateContact;
