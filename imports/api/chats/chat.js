import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');




if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('chats', function chatsPublication() {
    return Chats.find({
      $or: [
        { recipientes: this.userId }
      ],
    });
  });
}

Meteor.methods({
  'chats.create'(user, nameChat) {

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Chats.create({
      owner: this.userId,
      recipientes: [user],
      username: Meteor.users.findOne(this.userId).username,
      chatName: nameChat,
    });

  },

'chats.insertRecipient'(userid) {
  Chats.update({_id: id,
                recipientes: userid
              })

}

});
