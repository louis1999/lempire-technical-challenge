import { Template } from 'meteor/templating';
import { ExportsCollection } from "../db/exports/ExportsCollection";
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.css'
import './App.html';
import './Export.js';
import './Login.js'



// INFORMATION FOR LOUIS : Tracker.autorun run a function now and rerun it later whenever its dependencies change, which is perfect for us to know when our data is ready to be displayed to the user

const IS_LOADING_STRING = "isLoading";
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
const getExportsFilter = () => {
    const user = getUser();
    const userFilter = user ? { userId: user._id } : {};
    return { userFilter };
}



  Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
  
    const handler = Meteor.subscribe('exports');
    Tracker.autorun(() => {
      this.state.set(IS_LOADING_STRING, !handler.ready());
    });
  });

  Template.form.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('error', null); 
  });



Template.mainContainer.helpers({

    exports() {
        const { userFilter } = getExportsFilter();
        if (!isUserLogged()) {
            return [];
          }
        return ExportsCollection.find( userFilter, {
            sort: { createdAt: -1 },
        }).fetch(); // sort the exports from the newest to the oldest
    },
    exportsCount() {
        return ExportsCollection.find().count();
    },
    isUserLogged() {
        return isUserLogged();
      },
    getUser() {
        return getUser();
    },
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING_STRING);
      }
  });

Template.form.helpers({
    error(){
        return Template.instance().state.get("error")
    }
})

Template.mainContainer.events({
    'click .user'() {
        Meteor.logout();
      },
})

Template.form.events({


    "submit .export-form"(event, templateInstance) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const title = target.title.value;

        templateInstance.state.set('error', null); 
        // Insert a task into the collection

        Meteor.call('exports.insert', title, (error) => {// INFORMATION FOR LOUIS: no need to pass the user in parameter, we have access to in in the backend with "this"
            if (error) {
                const errorMessage = error.message.replace('[', '').replace(']', ''); 
                templateInstance.state.set('error', errorMessage);           
            } else {
                target.title.value = '';
            }
        });
        

    }
})