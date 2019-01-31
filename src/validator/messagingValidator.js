import Validator from 'validator';
import isEmpty from './is-empty';


const validateMessage = (data) => {
  const errors = {};

  data.senderNumber = !isEmpty(data.senderNumber) ? data.senderNumber : '';
  data.receiverNumber = !isEmpty(data.receiverNumber) ? data.receiverNumber : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  if (!Validator.isLength(data.senderNumber, { min: 11, max: 11 })) {
    errors.senderNumber = 'enter a valid phone numeber';
  }
  if (Validator.isEmpty(data.senderNumber)) {
    errors.senderNumber = 'sender phone number can not be empty';
  }
  if (!Validator.isLength(data.receiverNumber, { min: 11, max: 11 })) {
    errors.receiverNumber = 'enter a valid phone numeber';
  }
  if (Validator.isEmpty(data.receiverNumber)) {
    errors.receiverNumber = 'receiver phone number can not be empty';
  }
  if (!Validator.isLength(data.message, { max: 160 })) {
    errors.message = 'Message can not exceed 160 characters';
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = 'Message can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateMessage;
