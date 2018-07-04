import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './messages.html';

Template.message.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
