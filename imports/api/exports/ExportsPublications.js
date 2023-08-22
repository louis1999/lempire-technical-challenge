
// INFORMATION FOR LOUIS: Tasks.find(), we will get every task in the collection. That’s not good if our application users want to store private and sensitive data. We need to control which data Meteor sends to the client-side database.
// in the back : Meteor.publish: allows the data to be published from the server to the client;
// in the front : Meteor.subscribe: allows the client code to ask for data.

import { Meteor } from 'meteor/meteor';
import { ExportsCollection } from '/imports/db/exports/ExportsCollection';

Meteor.publish('exports', function publishExports() {
  return ExportsCollection.find({ userId: this.userId });
});