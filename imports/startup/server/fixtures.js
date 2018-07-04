import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/chats/messages.js';



Meteor.start(() => {
  if (Messages.find().count() === 0){
    const data = [
      {
        idChat: 1,
        idSender: 1,
        msg: "chat 1, sender 1",
        sentAt: new Date(),
      },
      {
        idChat: 2,
        idSender: 1,
        msg: "chat 2, sender 1",
        sentAt: new Date(),
      },
      {
        idChat: 3,
        idSender: 1,
        msg: "chat 3, sender 1",
        sentAt: new Date(),
      },
      {
        idChat: 1,
        idSender: 2,
        msg: "chat 1, sender 2",
        sentAt: new Date(),
      },
      {
        idChat: 1,
        idSender: 2,
        msg: "chat 1, sender 3",
        sentAt: new Date(),
      },
      {
        idChat: 1,
        idSender: 3,
        msg: "chat 1, sender 3",
        sentAt: new Date(),
      },
    ];

    data.forEach(message => Messages.insert(message));
  }
});
