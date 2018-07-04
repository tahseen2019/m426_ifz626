import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

var myData = {
              idChat: this.idChat,
              idSender: this.userID,
              msg: "test",
              sentAt: new Date(),
            }



Messages.insert(myData);

Meteor.methods({
  'messages.insert'(chatId, senderId, text, sentAt) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      idChat: chatId,
      idSender: senderId,
      msg: text,
      sentAt: sentAt,
    });
  },
  'messages.find'(chatId) {
    // Make sure the user is logged in before inserting a task
    console.log("Messages: entered messages.find, Param: " + chatId);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(Messages.find( { idChat: chatId }, {sort: {sentAt: -1}}).fetch());

  },
});
