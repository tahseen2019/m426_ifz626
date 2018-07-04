import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';


import { Messages } from '../api/messages.js';

import './messages.js';
import './chat.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('messages');
});


Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();


    console.log("submit .new-message");

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    var myData = {
                  idChat: this.idChat,
                  idSender: this.userID,
                  msg: text,
                  sentAt: new Date(),
                }

    // Insert a task into the collection
    Messages.insert(myData);



    // Clear form
    target.text.value = '';
  },
});
