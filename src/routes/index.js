import express from 'express';
import Contact from '../controller/index';

const { addContact, sendMessage, getSentMessages } = Contact;

const router = express.Router();

router.post('/contact', addContact);
router.post('/message', sendMessage);
router.get('/message', getSentMessages);

export default router;
