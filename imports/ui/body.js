import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Messages } from '../api/messages.js';
import '../api/create-chat.js';

import './chat.js';
import './body.html';



Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('messages');
});

Template.body.helpers({
  /*tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all  'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
      },
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },*/
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
   'submit .chat-erstellen'(event) {
     console.log("You clicked something");
    // Prevent default browser form submit

    event.preventDefault();


    console.log("submit .new-messages");

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
