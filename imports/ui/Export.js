import { Template } from 'meteor/templating';

import { ExportsCollection } from "../db/exports/ExportsCollection";

import './Export.html';



Template.export.events({
  'click .delete'() {
    Meteor.call('exports.remove', this._id);

  },
});