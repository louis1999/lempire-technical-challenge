

// INFORMATION FOR LOUIS : Before this step, any user could edit any part of the database by making changes directly on the client-side. 
// This is good for rapid prototyping, but real applications require control over data access.
// => au lieu de faire la logique metier dans le front, on bouge ça dans le back dans les fichiers de methodes.
// c'est faisable grâce au package insecure, donc mtn on le retire pour empecher cette faille de securite
// si on fait meteor remove insecure et qu'on essaie de reutiliser la version du site, on obtient insert failed car on n'est plus authorise a faire des actions non securisees


import { check } from 'meteor/check';
import { ExportsCollection } from '../../db/exports/ExportsCollection';




Meteor.methods({

    'exports.insert'(title) {
      check(title, String); // TODO RECOMMANDATION : recommend that you change your check calls for wrong types to produce some errors, then you can understand what will happen in these cases as well.

      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
      
      const existingExport = ExportsCollection.findOne({ title, userId: this.userId });
      if (existingExport) {
        throw new Meteor.Error('Title must be unique.');
      }
   

      const exportId = ExportsCollection.insert({
        title,
        progression: 0,
        createdAt: new Date(),
        userId: this.userId,
      });

      const incrementProgression = (exportId) => {
        ExportsCollection.update(
          { _id: exportId },
          { $inc: { progression: 5 } } // increment by 5 the progression with "$inc"
        );

        const exp = ExportsCollection.findOne(exportId);

        if (exp.progression < 100) {
          // Continue incrementing if progression is not yet 100
          Meteor.setTimeout(() => incrementProgression(exportId), 1000); // recursion to launch again the function every one sec (if progression<100 )
        }else{
          // when we arrive at 100% of progression, we have to update the url
          const urls = [
            "https://www.lempire.com/",
            "https://www.lemlist.com/",
            "https://www.lemverse.com/",
            "https://www.lemstash.com/" // TODO this url is not working
          ];
          const randomIndex = Math.floor(Math.random() * urls.length);
          const randomUrl = urls[randomIndex];
          ExportsCollection.update(
            { _id: exportId },
            { $set: { url: randomUrl } } // update an attribute wiht "$set"
          );
        }
      };

      // start incrementing the progression by 5, after one sec and then every 5 sec until 100
      Meteor.setTimeout(() => incrementProgression(exportId), 1000);


    },


   
    'exports.remove'(exportId) {
      check(exportId, String);
   
      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
   
      const export_to_be_deleted = ExportsCollection.findOne({ _id: exportId, userId: this.userId });

      if (!export_to_be_deleted) {
        throw new Meteor.Error('Access denied.');
      }
  
      ExportsCollection.remove(exportId);
    },
   
    
  });