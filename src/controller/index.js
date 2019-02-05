import validateContact from '../validator/contactValidator';
import validateMessage from '../validator/messagingValidator';
import Contacts from '../models/Contact';
import Messaging from '../models/Messaging';


class Contact {
/**
 * Route: POST: /api/v1/contact
 * @description This method adds user contact
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
   * Routes: POST: /api/v1/message
   * @description This method sends message
   * @param {object} req
   * @param {object} res
   * @returns {object}
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
                  phoneNumber: req.body.receiverNumber,
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
   * Routes: GET: /api/v1/message?sender=messageId or ?receiver=messageId
   * @description  This method gets messages by sender or receiver
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static getSentMessages(req, res) {
    const requestSender = req.query.sender;
    const requestReceiver = req.query.receiver;
    if (!(requestSender || requestReceiver)) {
      res.status(400).json({ msg: 'unknown request' });
    }
    if (requestSender) {
      Messaging.findOne({ _id: requestSender.trim() }).then((msg) => {
        res.status(200).json({
          sender: msg.sender.name,
          message: msg.message,
          date: msg.createdAt,
          status: 'success',
        });
      }).catch(() => (res.status(404).json({ msg: 'something went wrong', status: 'fail' })));
    }
    if (requestReceiver) {
      Messaging.findOne({ _id: requestReceiver.trim() }).then((msg) => {
        res.status(200).json({
          receiver: msg.receiver.name,
          message: msg.message,
          date: msg.createdAt,
          status: 'success',
        });
      }).catch(() => (res.status(404).json({ msg: 'message not found', status: 'fail' })));
    }
  }

  /**
   * Routes: GET: /api/v1/contact?contact=phoneNumber
   * @description This method gets a users contact
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static getContact(req, res) {
    // eslint-disable-next-line prefer-destructuring
    const phoneNumber = req.query.contact.trim();
    if (!phoneNumber) {
      res.status(400).json({ msg: 'unknown request' });
    }
    if (phoneNumber) {
      Contacts.findOne({ phoneNumber }).then((user) => {
        res.status(200).json({
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          date: user.createdAt,
          status: 'success',
        });
      }).catch(() => (res.status(404).json({ msg: 'contact not found', status: 'fail' })));
    }
  }

  /**
   * Routes: DELETE: /api/v1/contacts/:phoneNumber
   * @description This deletes a user contact
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static deleteContact(req, res) {
    // eslint-disable-next-line prefer-destructuring
    const contact = req.params.phoneNumber.trim();
    if (!contact) {
      res.status(400).json({ msg: 'unknown request' });
    }
    if (contact) {
      Contacts.findOne({ phoneNumber: contact }).then((contact) => {
        Contacts.remove({ _id: contact._id }).then(() => {
          res.status(202).json({
            msg: 'contact removed sucessfully',
            status: 'success',
          });
        }).catch(() => (res.status(404).json({ msg: 'something went wrong', status: 'fail' })));
      });
    }
  }

  /**
   * Routes: DELETE: /api/v1/message/:messageId/contacts/:contactId
   * @description This deletes message created by a user
   * @param {object} req
   * @param {oblect} res
   * @return {void}
   */
  static deleteMessage(req, res) {
    const messageId = req.params.messageId.trim();
    const contactId = req.params.contactId.trim();
    if (!(req.params.messageId || req.params.contactId)) {
      return res.status(401).json({
        status: false,
        msg: ' Unauthorized to perform this operation',
      });
    }
    Messaging.find({}).where({ _id: messageId, 'sender.id': contactId })
      .then((message) => {
        if (!message) {
          return res.status(404).json({
            msg: 'message does not exist',
            status: 'fail',
          });
        }
        Messaging.remove({ _id: messageId })
          .then(() => res.status(202).send({
            status: true,
            msg: 'Message deleted successfully',
          }));
      }).catch(() => (res.status(500).json({ msg: 'something went wrong', status: 'fail' })));
  }
}
export default Contact;
