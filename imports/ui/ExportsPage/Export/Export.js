import { Template } from 'meteor/templating';


import './Export.html';
import './Export.css';



Template.export.events({
  'click .delete'() {
    Meteor.call('exports.remove', this._id);

  },
});