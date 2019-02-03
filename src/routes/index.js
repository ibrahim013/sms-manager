import express from 'express';
import Contact from '../controller/index';

const {
  addContact,
  sendMessage,
  getSentMessages,
  getContact,
  deleteContact,
  deleteMessage,
} = Contact;

const router = express.Router();

router.post('/contact', addContact);
router.get('/contact', getContact);
router.delete('/contact/:phoneNumber', deleteContact);
router.post('/message', sendMessage);
router.get('/message', getSentMessages);
router.delete('/message/:messageId/contacts/:contactId', deleteMessage);

export default router;
