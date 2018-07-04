import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/chats/messages.js';



var myData = {
              idChat: this.idChat,
              idSender: this.userID,
              msg: "test",
              sentAt: new Date(),
            }




Meteor.start(() => {
  Messages.insert(myData);
});
