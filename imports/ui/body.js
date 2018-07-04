import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { Messages } from '../api/messages.js';

import './task.js';
import './chat.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

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
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
   'click button': function(){
     console.log("You clicked something");
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const user = target.user.value;
    const nameChat = target.nameChat.value;

    // Insert a task into the collection
    Meteor.call('chatCreate.insert', user, nameChat);
    Console.log(Messages.find( { idChat: 1 }).fetch());

    // Clear form
    target.user.value = '';
    target.nameChat	.value = '';
  },
});
