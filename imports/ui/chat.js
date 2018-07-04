import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './chat.html';

Template.chat.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.chat.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('chatCreate.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('chatCreate.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('chatCreate.setPrivate', this._id, !this.private);
  },
});
