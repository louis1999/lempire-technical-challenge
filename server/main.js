import { Meteor } from 'meteor/meteor';
import { ExportsCollection } from '/imports/db/exports/ExportsCollection';
import '/imports/api/exports/ExportsMethods';
import '/imports/api/exports/ExportsPublications';

const insertExport = (exportTitle, progression = 0, user) => {
  ExportsCollection.insert({
    title: exportTitle,
    userId: user._id,
    progression: progression, 
    url:null
  });
};

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

const SEED_USERNAME_2 = 'meteorite2';
const SEED_PASSWORD_2 = 'password';

Meteor.startup(() => {

  // create first user of the app
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  if (!Accounts.findUserByUsername(SEED_USERNAME_2)) {
    Accounts.createUser({
      username: SEED_USERNAME_2,
      password: SEED_PASSWORD_2,
    });
  }


  const user = Accounts.findUserByUsername(SEED_USERNAME);
  const user2 = Accounts.findUserByUsername(SEED_USERNAME_2);


  // To clean the database
  // ExportsCollection.remove({});

  
  if (ExportsCollection.find().count() === 0) {
    [
      'First Export',
      'Second Export',
      'Third Export',
      'Fourth Export',
      'Fifth Export',
      'Sixth Export',
      'Seventh Export'
    ].forEach(exportTitle => insertExport(exportTitle, 0, user, null));
  }

  // some data for seco,nd user
  // ['meteor2 export'].forEach(exportTitle => insertExport(exportTitle, 0, user2))

  // to check the database
  // console.log(ExportsCollection.find().fetch())
});