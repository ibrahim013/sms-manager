import validateContact from '../validator/contactValidator';
import validateMessage from '../validator/messagingValidator';
import Contacts from '../models/Contact';
import Messaging from '../models/Messaging';
/**
 * @description this handle adding of contact
 */

class Contact {
/**
 * @description this is a method that add a new contact to the database
 * @param {object} req
 * @param {object} res
 */
  static addContact(req, res) {
    const { errors, isValid } = validateContact(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Contacts.findOne({ phoneNumber: req.body.phoneNumber }).then((contact) => {
      if (contact) {
        return res.status(400).json({ msg: 'this number already exist' });
      }
      const newContact = new Contacts({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      });
      newContact.save().then(contact => res.status(200).json(contact))
        .catch(err => res.status(500).json({ msg: 'Somthing went wrong, try again', err }));
    });
  }

  /**
   * @description this is a method that add a new contact to the database
   * @param {object} req
   * @param {object} res
   */
  static sendMessage(req, res) {
    const { errors, isValid } = validateMessage(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Contacts.findOne({ phoneNumber: req.body.senderNumber })
      .then((senderContact) => {
        if (!senderContact) {
          res.status(400).json({ msg: 'sender number is not registered on our system', status: 'fail' });
        }
        if (senderContact) {
          Contacts.findOne({ phoneNumber: req.body.receiverNumber }).then((receiverContact) => {
            if (!receiverContact) {
              res.status(400).json({ msg: 'receiver number is not registered on our system', status: 'fail' });
            }
            if (receiverContact) {
              const newMessage = new Messaging({
                sender: {
                  id: senderContact._id,
                  phoneNumber: req.body.senderNumber,
                  name: senderContact.name,
                },
                receiver: {
                  id: receiverContact._id,
                  phoneNumber: req.body.senderNumber,
                  name: receiverContact.name,
                },
                message: req.body.message,
              });
              newMessage.save().then(contact => res.status(200).json(contact))
                .then(message => res.status(200).json(message))
                .catch(err => res.status(500).json({ msg: 'Somthing went wrong, try again', err }));
            }
          }).catch(err => res.status(500).json({ msg: 'something went wrong', err }));
        }
      }).catch(err => res.status(500).json({ msg: 'something went wrong', err }));
  }

  /**
   * @description GET: /api/v1/message?sender=messageId or ?receiver=messageId
   */
  static getSentMessages(req, res) {
    const requestSender = req.query.sender;
    const requestReceiver = req.query.receiver;
    if (!(requestSender || requestReceiver)) {
      res.status(400).json({ msg: 'unknown request' });
    }
    if (requestSender) {
      Messaging.findOne({ _id: requestSender.trim() }).then((msg) => {
        res.status(400).json({
          sender: msg.sender.name,
          message: msg.message,
          date: msg.createdAt,
          status: 'success',
        })
          .catch(() => (res.status(404).json({ msg: 'something went wrong', status: 'fail' })));
      });
    }
    if (requestReceiver) {
      Messaging.findOne({ _id: requestReceiver.trim() }).then((msg) => {
        res.status(400).json({
          receiver: msg.receiver.name,
          message: msg.message,
          date: msg.createdAt,
          status: 'success',
        });
      }).catch(() => (res.status(404).json({ msg: 'message not found', status: 'fail' })));
    }
  }
}
export default Contact;
