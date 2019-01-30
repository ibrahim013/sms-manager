import express from 'express';
import Contact from '../controller/index';

const { addContact, sendMessage } = Contact;

const router = express.Router();

router.post('/contact', addContact);
router.post('/message', sendMessage);

export default router;
