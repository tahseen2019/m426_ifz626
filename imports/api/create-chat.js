import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import 'chats.js';



if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('chats', function tasksPublication() {
    return Chats.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'chats.create'(user, nameChat) {
    check(user,nameChat, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

  /*  Chats.insert({
      owner: this.userId,
      recipientes: [user],
      username: Meteor.users.findOne(this.userId).username,
      chatName: nameChat,
    });*/
  },
  'Chats.remove'(chatsId) {
    const task = Chats.findOne(chatsId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Chats.remove(chatsId);
  },
  'chats.setChecked'(chatsId, setChecked) {
    check(chatsId, String);
    check(setChecked, Boolean);

    const task = Chats.findOne(chatsId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(chatsId, { $set: { checked: setChecked } });
  },
  'chats.setPrivate'(chatsId, setToPrivate) {
    check(chatsId, String);
    check(setToPrivate, Boolean);

    const task = Chats.findOne(chatsId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Chats.update(chatsId, { $set: { private: setToPrivate } });
  },
});
