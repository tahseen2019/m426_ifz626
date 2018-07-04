import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');



Meteor.methods({
  'messages.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      idChat: this.idChat,
      idSender: this.userId,
      msg: text,
      sentAt: new Date(),
    });
  },
  'messages.find'(chatId) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.find( { idChat: chatId } );
  },
});
